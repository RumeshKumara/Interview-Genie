"use client";
import { db } from "../../../../util/db";
import { MockInterview } from "../../../../util/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

function Interview(params) {
  const [interviewData, setInterviewData] = useState();
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
  return (
    <div>
      <h2 className="text-3xl font-bold ">Let's Get Started</h2>
    </div>
  );
}

export default Interview;
