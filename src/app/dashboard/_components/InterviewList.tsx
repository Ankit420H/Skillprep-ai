"use client";
import React from "react";
import InterviewItemCard from "./InterviewItemCard";
import { MockInterview } from "@/types";

interface Props {
    initialInterviews: MockInterview[];
}

const InterviewList = ({ initialInterviews }: Props) => {
    if (!initialInterviews || initialInterviews.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No interviews found. Start a new one!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {initialInterviews.map((interview, i) => (
                <InterviewItemCard interview={interview} key={i} />
            ))}
        </div>
    );
};

export default InterviewList;
