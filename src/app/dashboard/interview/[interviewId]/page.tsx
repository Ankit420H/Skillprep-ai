import React from "react";
import { db } from "@/core/db/db";
import { MockInterview } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import InterviewClient from "./InterviewClient";
import { redirect } from "next/navigation";

export default async function Interview({ params }: { params: { interviewId: string } }) {
  const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
  
  if (result.length === 0) {
    redirect("/dashboard");
  }

  return <InterviewClient interview={result[0]} />;
}