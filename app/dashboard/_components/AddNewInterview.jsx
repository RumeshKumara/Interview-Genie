"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { LoaderCircle } from "lucide-react";
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

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState(""); // default to empty string
  const [jobDesc, setJobDesc] = useState(""); // default to empty string
  const [jobExperience, setJobExperience] = useState(""); // default to empty string
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [error, setError] = useState(""); // add error state
  const router = useRouter();
  const { user } = useUser();

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
    <div>
      <div
        className="p-14 transition-all duration-300 rounded-lg cursor-pointer text-[#5100ff] bg-[#d8cdff] hover:scale-105 hover:shadow-sm dark:bg-[#2a2149] dark:text-[#7433ff] "
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg font-semibold text-center">
          + Add New Interview
        </h2>
      </div>
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
                      onChange={(event) => setJobExperience(event.target.value)}
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
  );
}

export default AddNewInterview;
