import React from "react";
import { db } from "@/core/db/db";
import { MockInterview } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import StartInterviewClient from "./StartInterviewClient";

export default async function StartInterview({ params }: { params: { interviewId: string } }) {
  const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
  
  if (result.length === 0) {
    redirect("/dashboard");
  }

  const interview = result[0];
  let questions = [];
  try {
    questions = JSON.parse(interview.jsonMockResp);
  } catch (error) {
    console.error("Failed to parse interview questions", error);
  }

  return <StartInterviewClient interview={interview} questions={questions} />;
}