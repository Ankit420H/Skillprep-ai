import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListChecks, Trophy, TrendingUp } from "lucide-react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { db } from "@/core/db/db";
import { MockInterview, UserAnswer } from "@/core/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function Dashboard() {
  const user = await currentUser();
  
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    redirect("/sign-in");
  }

  const email = user.primaryEmailAddress.emailAddress;

  // Fetch data in parallel
  const [interviews, userAnswers] = await Promise.all([
    db.select().from(MockInterview).where(eq(MockInterview.createdBy, email)).orderBy(desc(MockInterview.id)),
    db.select().from(UserAnswer).where(eq(UserAnswer.userEmail, email))
  ]);

  const total = userAnswers.length;
  const best = total > 0 ? Math.max(...userAnswers.map((item) => parseInt(item.rating || "0", 10))) : 0;
  
  const calcImprovement = (answers: typeof userAnswers) => {
    if (answers.length <= 1) return 0;
    const scores = answers
      .map((item) => parseInt(item.rating || "0", 10))
      .sort((a, b) => a - b);
    const improvement = ((scores[scores.length - 1] - scores[0]) / (scores[0] || 1)) * 100;
    return Math.round(improvement);
  };

  const improvement = calcImprovement(userAnswers);

  const stats = {
    total: total.toString(),
    best: best ? `${best}/10` : "N/A",
    improvement: `${improvement}%`,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            Dashboard
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back, <span className="font-semibold text-foreground">{user?.firstName || "Candidate"}</span>.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <ListChecks className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Personal Best</CardTitle>
            <div className="p-2 bg-secondary/10 rounded-full text-secondary">
              <Trophy className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.best}</div>
            <p className="text-xs text-muted-foreground mt-1">Top Score</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Growth Rate</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-full text-green-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.improvement}</div>
            <p className="text-xs text-muted-foreground mt-1">Since last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">History</h2>
          </div>
          <InterviewList initialInterviews={interviews} />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">New Interview</h2>
          <Card className="rounded-[20px] border-dashed border-2 border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer h-full min-h-[200px] flex flex-col items-center justify-center text-center p-6">
            <AddNewInterview />
          </Card>
        </div>
      </div>
    </div>
  );
}