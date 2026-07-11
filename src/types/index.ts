import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { MockInterview, UserAnswer } from "@/core/db/schema";

export type MockInterview = InferSelectModel<typeof MockInterview>;
export type NewMockInterview = InferInsertModel<typeof MockInterview>;

export type UserAnswerType = InferSelectModel<typeof UserAnswer>;
export type NewUserAnswerType = InferInsertModel<typeof UserAnswer>;

export interface Question {
  question: string;
  answer?: string; // Sometimes the AI generates correct answers as well
}

export interface Feedback {
  rating: number;
  feedback: string;
}
