"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { ListChecks, Trophy, TrendingUp } from "lucide-react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { Card, CardContent, CardHeader, CardTitle, Button, Skeleton } from "@/components/ui";

function Dashboard() {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: "0",
    best: "N/A",
    improvement: "0%",
  });

  const fetchData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    setLoading(true);

    try {
      // Fetch User Answers for Stats
      const answersRes = await fetch("/api/fetchUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.primaryEmailAddress.emailAddress }),
      });

      if (answersRes.ok) {
        const result = await answersRes.json();
        const userAnswers = result.userAnswers.filter(
          (item) => item.userEmail === user.primaryEmailAddress.emailAddress
        );

        const total = userAnswers.length;
        const best = total > 0 ? Math.max(...userAnswers.map((item) => parseInt(item.rating || "0"))) : 0;
        const improvement = calcImprovement(userAnswers);

        setStats({
          total: total.toString(),
          best: best ? `${best}/10` : "N/A",
          improvement: `${improvement}%`,
        });
      }

      // Fetch Interviews for List
      const interviewsRes = await fetch(`/api/get-interviews?userEmail=${user.primaryEmailAddress.emailAddress}`);
      if (interviewsRes.ok) {
        const interviewList = await interviewsRes.json();
        setInterviews(interviewList);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const calcImprovement = (interviews) => {
    if (interviews.length <= 1) return 0;
    const scores = interviews
      .map((item) => parseInt(item.rating || "0"))
      .sort((a, b) => a - b);
    const improvement = ((scores[scores.length - 1] - scores[0]) / scores[0]) * 100;
    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) fetchData();
  }, [user]);

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
            {loading ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <>
                <div className="text-3xl font-bold text-foreground">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">Completed</p>
              </>
            )}
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
            {loading ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <>
                <div className="text-3xl font-bold text-foreground">{stats.best}</div>
                <p className="text-xs text-muted-foreground mt-1">Top Score</p>
              </>
            )}
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
            {loading ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <>
                <div className="text-3xl font-bold text-foreground">{stats.improvement}</div>
                <p className="text-xs text-muted-foreground mt-1">Since last month</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">History</h2>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <InterviewList interviews={interviews} loading={loading} />
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

export default Dashboard;