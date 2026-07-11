import React from "react";
import { db } from "@/core/db/db";
import { UserAnswer } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import FeedbackClient from "./FeedbackClient";

export default async function Feedback({ params }: { params: { interviewId: string } }) {
  const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId));

  return <FeedbackClient feedbackList={result} />;
}