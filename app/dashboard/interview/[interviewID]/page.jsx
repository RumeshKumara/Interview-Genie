"use client";
import { Lightbulb, WebcamIcon } from "lucide-react";
import ReactWebcam from "react-webcam";
import { db } from "../../../../util/db";
import { MockInterview } from "../../../../util/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";

function Interview(params) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    console.log(params.interviewID);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewID)); // use mockId, not mockID

    console.log(result);
    setInterviewData(result[0]);
  };

  const handleEnableWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setWebCamEnabled(true);
      setPermissionError(false);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setPermissionError(true);
      setWebCamEnabled(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-10">
        <h2 className="text-3xl font-bold text-[#5100ff]">Let's Get Started</h2>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-[#5100ff]">
              Interview Details
            </h3>
            <div className="p-4 rounded-lg bg-sky-100">
              {interviewData ? (
                <div className="flex flex-col gap-3">
                  <p>
                    <strong>Job Position:</strong> {interviewData.jobPosition}
                  </p>
                  <p>
                    <strong>Job Description/Tech Stack:</strong>{" "}
                    {interviewData.jobDesc}
                  </p>
                  <p>
                    <strong>Experience Required:</strong>{" "}
                    {interviewData.jobExperience}
                  </p>
                </div>
              ) : (
                <p className="text-sky-500">Loading interview details...</p>
              )}
            </div>
            <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <h2 className="text-yellow-500 ">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <p className="text-sm text-yellow-700">
                This is a mock interview session. Please ensure your webcam and
                microphone are enabled for the best experience.
                <br />
                <br />
                <strong className="text-yellow-800">Note:</strong> This is a
                mock interview, not a real one.
                <br />
                You can ask questions related to the job position, and I will
                respond as if I were the interviewer.
              </p>
            </div>
          </div>

          <div>
            {webCamEnabled ? (
              <ReactWebcam
                onUserMediaError={(err) => {
                  console.error(err);
                  setWebCamEnabled(false);
                  setPermissionError(true);
                }}
                mirrored={true}
                width={300}
                height={300}
                videoConstraints={{
                  facingMode: "user",
                }}
              />
            ) : (
              <>
                <WebcamIcon className="w-full p-20 my-4 mt-4 text-[#5100ff] bg-[#bfbfff] h-72 rounded-2xl" />
                <Button
                  onClick={handleEnableWebcam}
                  className="w-full py-6 text-[#5100ff] bg-[#f7f7f7] rounded-full hover:bg-[#5100ff] border border-[#5100ff] hover:text-white transition-colors duration-300"
                  disabled={webCamEnabled}
                >
                  Enable Webcam and Microphone
                </Button>
                {permissionError && (
                  <p className="mt-2 text-sm text-red-500">
                    Please allow camera and microphone access in your browser
                    settings
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end mt-10">
        <Button
          onClick={() => {
            if (webCamEnabled) {
              alert("Mock interview started! Ask your questions.");
            } else {
              alert("Please enable webcam and microphone first.");
            }
          }}
          className="py-5 text-white bg-[#5100ff] rounded-full py5 hover:bg-purple-700"
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
