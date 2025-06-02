"use client";
import {
  BadgeInfo,
  BookUser,
  ChartNoAxesGantt,
  Info,
  Lightbulb,
  WebcamIcon,
} from "lucide-react";
import ReactWebcam from "react-webcam";
import { db } from "../../../../util/db";
import { MockInterview } from "../../../../util/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const unwrappedParams = use(params);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    if (unwrappedParams?.interviewID) {
      console.log("Interview ID:", unwrappedParams.interviewID);
      GetInterviewDetails();
    }
  }, [unwrappedParams?.interviewID]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, unwrappedParams.interviewID));

      console.log("Fetched data:", result);
      if (result && result.length > 0) {
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching interview:", error);
    }
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
    <div className="container px-4 mx-auto">
      <div className="flex flex-col items-center justify-center my-16">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#5100ff] to-[#7e40ff] bg-clip-text text-transparent mb-12 transition-all hover:scale-105">
          Let's Get Started
        </h2>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="p-6 transition-all duration-300 border shadow-lg rounded-3xl bg-white/10 backdrop-blur-lg border-sky-500/30 hover:shadow-sky-500/10">
              <h2 className="flex items-center gap-3 pb-3 text-lg text-sky-500 dark:text-sky-400">
                <ChartNoAxesGantt className="w-6 h-6" />
                <strong>Details</strong>
              </h2>
              {interviewData ? (
                <div className="flex flex-col gap-4 dark:text-gray-200">
                  <p className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Job Position
                    </span>
                    <strong className="text-lg">
                      {interviewData.jobPosition}
                    </strong>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Tech Stack
                    </span>
                    <strong className="text-lg">{interviewData.jobDesc}</strong>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Experience Required
                    </span>
                    <strong className="text-lg">
                      {interviewData.jobExperience}
                    </strong>
                  </p>
                </div>
              ) : (
                <div className="flex space-x-4 animate-pulse">
                  <div className="flex-1 py-1 space-y-4">
                    <div className="w-3/4 h-4 rounded bg-sky-500/20"></div>
                    <div className="space-y-2">
                      <div className="h-4 rounded bg-sky-500/20"></div>
                      <div className="w-5/6 h-4 rounded bg-sky-500/20"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 rounded-3xl bg-yellow-50/10 backdrop-blur-lg border border-yellow-500/30 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 dark:bg-[#3d3513]/50">
              <h2 className="flex items-center gap-3 pb-3 text-lg text-yellow-600 dark:text-yellow-400">
                <BadgeInfo className="w-6 h-6" />
                <strong>Information</strong>
              </h2>
              <div className="space-y-4 text-yellow-700 dark:text-yellow-300">
                <p className="text-sm leading-relaxed">
                  This is a mock interview session. Please ensure your webcam
                  and microphone are enabled for the best experience.
                </p>
                <div className="p-4 border rounded-2xl bg-yellow-500/10 border-yellow-500/20">
                  <strong className="text-yellow-600 dark:text-yellow-400">
                    Note:
                  </strong>
                  <p className="mt-2 text-sm">
                    This is a mock interview, not a real one. You can ask
                    questions related to the job position, and I will respond as
                    if I were the interviewer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {webCamEnabled ? (
              <div className="overflow-hidden rounded-3xl border-2 border-[#5100ff]/30 shadow-lg">
                <ReactWebcam
                  onUserMediaError={(err) => {
                    console.error(err);
                    setWebCamEnabled(false);
                    setPermissionError(true);
                  }}
                  mirrored={true}
                  width={500}
                  height={400}
                  videoConstraints={{
                    facingMode: "user",
                  }}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#bfbfff]/20 to-[#19133a]/20 backdrop-blur-lg border border-sky-500/30">
                  <WebcamIcon className="w-full p-16 text-sky-500/70 h-[400px]" />
                </div>
                <Button
                  onClick={handleEnableWebcam}
                  className="w-full py-6 text-[#5100ff] bg-white/50 dark:bg-[#19133a]/50 backdrop-blur-lg rounded-2xl 
                    hover:bg-[#5100ff] hover:text-white border border-sky-500/30 
                    transition-all duration-300 shadow-lg hover:shadow-[#5100ff]/20"
                  disabled={webCamEnabled}
                >
                  Enable Webcam and Microphone
                </Button>
                {permissionError && (
                  <p className="text-sm text-center text-red-500 dark:text-red-400 animate-pulse">
                    Please allow camera and microphone access in your browser
                    settings
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end mt-10 mb-16">
        <Link
          href={`/dashboard/interview/${unwrappedParams.interviewID}/start`}
        >
          <Button
            onClick={() => {
              if (webCamEnabled) {
                alert("Mock interview started! Ask your questions.");
              } else {
                alert("Please enable webcam and microphone first.");
              }
            }}
            className="px-8 py-6 text-white bg-gradient-to-r from-[#5100ff] to-[#7e40ff] rounded-full
              hover:shadow-lg hover:shadow-[#5100ff]/20 transition-all duration-300 hover:scale-105"
          >
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
