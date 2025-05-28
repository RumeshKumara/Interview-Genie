"use client";

import { db } from "../../../../../util/db";
import { MockInterview } from "../../../../../util/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewID));

      console.log("Fetched data:", result);
      if (result && result.length > 0) {
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching interview:", error);
    }

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log("Mock Interview Questions:", jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div>
      <h1>Start Interview</h1>
    </div>
  );
}

export default StartInterview;
