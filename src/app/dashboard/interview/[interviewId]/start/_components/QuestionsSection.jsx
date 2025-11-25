"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { Button, Card, CardContent } from "@/components/ui";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
    const speak = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser does not support text to speech");
        }
    };

    return (
        mockInterviewQuestion && (
            <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {mockInterviewQuestion.map((question, index) => (
                        <Button
                            key={index}
                            variant={activeQuestionIndex === index ? "default" : "outline"}
                            size="sm"
                            className="text-xs"
                        >
                            Q {index + 1}
                        </Button>
                    ))}
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-lg font-medium flex-1">
                                {mockInterviewQuestion[activeQuestionIndex]?.question || mockInterviewQuestion[activeQuestionIndex]?.q}
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => speak(mockInterviewQuestion[activeQuestionIndex]?.question || mockInterviewQuestion[activeQuestionIndex]?.q)}
                                title="Read question aloud"
                            >
                                <Volume2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50 text-blue-800">
                    <h3 className="flex gap-2 items-center font-semibold mb-2">
                        <Lightbulb className="h-5 w-5" />
                        Note
                    </h3>
                    <p className="text-sm">
                        Record or type your answer. Video is never recorded.
                    </p>
                </div>
            </div>
        )
    );
};

export default QuestionsSection;