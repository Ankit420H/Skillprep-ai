"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const InterviewList = ({ interviews, loading }) => {
    const { user } = useUser();
    const [list, setList] = useState(interviews || []);

    useEffect(() => {
        if (interviews) {
            setList(interviews);
        }
    }, [interviews]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="h-[200px] w-full rounded-[20px] border border-slate-100 bg-card p-6 shadow-soft">
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="mt-12 flex gap-3">
                            <Skeleton className="h-9 w-full rounded-lg" />
                            <Skeleton className="h-9 w-full rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!list || list.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No interviews found. Start a new one!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((interview, i) => (
                <InterviewItemCard interview={interview} key={i} />
            ))}
        </div>
    );
};

export default InterviewList;
