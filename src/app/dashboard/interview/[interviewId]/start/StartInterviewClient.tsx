"use client";
import React, { useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { MockInterview, Question } from "@/types";

interface Props {
  interview: MockInterview;
  questions: Question[];
}

const StartInterviewClient = ({ interview, questions }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onSave = () => {
    if (activeIndex < questions.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <p className="text-destructive font-semibold text-lg">No interview questions found.</p>
          <p className="text-muted-foreground">Please try creating a new interview.</p>
          <Link href="/dashboard">
            <Button variant="outline" className="mt-4">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header / Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Session</h2>
          <p className="text-sm text-muted-foreground">Q {activeIndex + 1} / {questions.length}</p>
        </div>
        <div className="hidden md:flex gap-2">
          {questions.map((_, index) => (
            <div key={index} className={`h-2 w-8 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary' : index < activeIndex ? 'bg-primary/40' : 'bg-muted'}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Question Section */}
        <div className="order-2 lg:order-1">
          <QuestionsSection mockInterviewQuestion={questions} activeQuestionIndex={activeIndex} />
        </div>

        {/* Answer Section */}
        <div className="order-1 lg:order-2">
          <RecordAnswerSection
            mockInterviewQuestion={questions}
            activeQuestionIndex={activeIndex}
            interviewData={interview}
            onAnswerSave={onSave}
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-6 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0 z-10 py-4">
        <Button
          variant="outline"
          onClick={() => setActiveIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {activeIndex < questions.length - 1 ? (
          <Button onClick={() => setActiveIndex(activeIndex + 1)} className="gap-2">
            Next Question <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>
            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
              Finish Interview <CheckCircle className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterviewClient;
