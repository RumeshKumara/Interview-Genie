"use client";
import React, { useState, useEffect } from "react"; // Add useEffect import
import { motion } from "framer-motion"; // Add this import
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { LoaderCircle, Plus } from "lucide-react";
import { MockInterview } from "../../../util/schema";
import { v4 as uuidv4 } from "uuid";
import { chatSession } from "../../../util/GeminiAIModal";
import { db } from "../../../util/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { Card } from "../../../components/ui/card"; // Add this import

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function AddNewInterview() {
  const [interviews, setInterviews] = useState([]);
  const [isLoadingInterviews, setIsLoadingInterviews] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState(""); // default to empty string
  const [jobDesc, setJobDesc] = useState(""); // default to empty string
  const [jobExperience, setJobExperience] = useState(""); // default to empty string
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [error, setError] = useState(""); // add error state
  const router = useRouter();
  const { user } = useUser();

  // Add useEffect to fetch interviews
  useEffect(() => {
    const fetchInterviews = async () => {
      setIsLoadingInterviews(true);
      try {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        if (userEmail) {
          const response = await db
            .select()
            .from(MockInterview)
            .where(MockInterview.createdBy.equals(userEmail));
          setInterviews(response || []);
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
        setInterviews([]);
      } finally {
        setIsLoadingInterviews(false);
      }
    };

    fetchInterviews();
  }, [user]);

  const onSubmit = async (e) => {
    setLoading(true);
    setError(""); // clear previous errors
    e.preventDefault();
    console.log(
      "Job Position:",
      jobPosition,
      "Job Description:",
      jobDesc,
      "Years of Experience:",
      jobExperience
    );

    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ", Based on this information, please give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview questions with answers in JSON format. Give 'Question' and 'Answer' as fields in JSON.";

    try {
      console.log("chatSession object:", chatSession); // Debugging log
      if (!chatSession || typeof chatSession.sendMessage !== "function") {
        throw new Error(
          "chatSession.sendMessage is not a function or is undefined"
        );
      }

      const result = await chatSession.sendMessage(InputPrompt);
      console.log("Raw AI Response:", result); // Log raw response for debugging

      // Extract text from Gemini response
      let responseText = "";
      try {
        responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch (e) {
        setError("AI response format error. Please try again.");
        setLoading(false);
        return;
      }
      if (!responseText) {
        setError("AI did not return any text. Please try again.");
        setLoading(false);
        return;
      }
      console.log("Response Text:", responseText); // Log response text

      const MockJsonResp = responseText
        .replace("```json", "")
        .replace("```", "")
        .trim();

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(MockJsonResp);
        // Defensive: ensure parsedResponse is an array or object
        if (
          typeof parsedResponse !== "object" ||
          parsedResponse === null ||
          (Array.isArray(parsedResponse) && parsedResponse.length === 0)
        ) {
          throw new Error("AI response JSON is empty or invalid.");
        }
        // If it's not an array, but an object, wrap in array for consistency
        if (!Array.isArray(parsedResponse)) {
          parsedResponse = [parsedResponse];
        }
      } catch (err) {
        setError(
          "AI response was not valid JSON or was empty. Please try again."
        );
        setLoading(false);
        return;
      }
      setJsonResponse(parsedResponse);

      let insertedData = null;
      if (result) {
        const newMockId = uuidv4();
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: newMockId,
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId }); // <-- fix: use correct property name

        console.log("Insert ID:", resp);
        if (
          Array.isArray(resp) &&
          resp.length > 0 &&
          resp[0] &&
          typeof resp[0] === "object" &&
          "mockId" in resp[0] &&
          resp[0].mockId
        ) {
          insertedData = {
            insertedId: resp[0].mockId,
            questionsAndAnswers: parsedResponse,
          };
          console.log("Inserted Data:", insertedData);

          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0].mockId);
        } else {
          setError("Failed to save interview. Please try again.");
        }
      } else {
        setError("No result returned from AI. Please try again.");
      }
    } catch (error) {
      setError("Error during submission: " + error.message);
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div
          className="p-14 transition-all duration-300 rounded-lg cursor-pointer text-[#5100ff] bg-[#EDF2F7] hover:scale-105 hover:shadow-sm dark:bg-[#1b1b1b] dark:text-[#7433ff]  border-[#3700ff] dark:border-[#2a2149] border-dashed border-1 flex flex-col items-center justify-center gap-4 group"
          onClick={() => setOpenDialog(true)}
        >
          <div className="p-4 transition-transform duration-300 rounded-full bg-[#d7eaff] text-[#5100ff] group-hover:scale-110 dark:bg-[#2a2149] dark:text-[#7433ff]">
            <Plus size={32} />
          </div>
          <h2 className="text-xl font-semibold text-center">
            Add New Interview
          </h2>
        </div>

        {/* Dialog for adding new interview */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl ">
                Tell us more about Job you are interview
              </DialogTitle>
              <DialogDescription>
                <form action="" onSubmit={onSubmit}>
                  <div>
                    <h2>
                      Add Details about job position/role, You skills and Yer of
                      experience
                    </h2>

                    <div className="flex flex-col gap-2 my-3 mt-7">
                      <label htmlFor="" className="text-black dark:text-white ">
                        Job Role/Job Position
                      </label>
                      <Input
                        placeholder="Ex. Full Stack Developer"
                        required
                        onChange={(event) => setJobPosition(event.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-3 mt-7">
                      <label htmlFor="" className="text-black dark:text-white ">
                        Job Description/ Tech Stack (In Short)
                      </label>
                      <Textarea
                        placeholder="Ex. React, Angular, NodeJs, MySQL"
                        required
                        onChange={(event) => setJobDesc(event.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-3 mb-7 mt-7">
                      <label htmlFor="" className="text-black dark:text-white ">
                        Years of Experience
                      </label>
                      <Input
                        placeholder="5"
                        type="number"
                        max="100"
                        required
                        onChange={(event) =>
                          setJobExperience(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  {error && <div className="mb-2 text-red-500">{error}</div>}
                  <div className="flex justify-end gap-5 ">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="transition-all duration-300 hover:scale-105"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className=" animate-spin" />
                          <span className="ml-2">Generating from AI...</span>
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* <motion.div
        className="grid grid-cols-1 gap-6 mt-8 w-8xl md:grid-cols-4"
        variants={container}
      >
        <motion.div variants={item}>
          <Card className="p-6 transition-all duration-300 shadow-lg card-hover-effect bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">
                Total Interviews
              </p>
              <h4 className="text-3xl font-bold text-[#5100ff]">
                {isLoadingInterviews ? "..." : interviews.length}
              </h4>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-6 transition-all duration-300 shadow-lg card-hover-effect bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Practice Time</p>
              <h4 className="text-3xl font-bold text-[#5100ff] ">0 hrs</h4>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-6 transition-all duration-300 shadow-lg card-hover-effect bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">
                Completion Rate
              </p>
              <h4 className="text-3xl font-bold text-[#5100ff]">0%</h4>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-6 transition-all duration-300 shadow-lg card-hover-effect bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Average Score</p>
              <h4 className="text-3xl font-bold text-[#5100ff]">0%</h4>
            </div>
          </Card>
        </motion.div>
      </motion.div> */}
    </>
  );
}

export default AddNewInterview;
