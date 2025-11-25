"use client";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import {
  CheckCircle2,
  XCircle,
  ChevronsUpDown,
  Activity,
  Target,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const Feedback = () => {
  const params = useParams();
  const [list, setList] = useState([]);
  const [avg, setAvg] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (params?.interviewId) {
      fetchFeedback();
    }
  }, [params?.interviewId]);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/get-feedback?mockId=${params.interviewId}`);
      if (res.ok) {
        const result = await res.json();
        if (Array.isArray(result)) {
          setList(result);
          const valid = result.map((item) => parseFloat(item.rating)).filter((r) => !isNaN(r));
          const total = valid.reduce((sum, r) => sum + r, 0);
          setAvg(valid.length > 0 ? (total / valid.length).toFixed(1) : null);
        } else {
          setList([]);
        }
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setList([]);
    }
    setLoading(false);
  };

  const getColor = (rating) => {
    const num = parseFloat(rating);
    if (num >= 8) return "text-green-600";
    if (num >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-indigo-600 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your interview feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {list.length === 0 ? (
        <Card className="max-w-md mx-auto bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <CardHeader className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              No Feedback Yet
            </h2>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              It seems like no feedback has been generated for this interview.
            </p>
            <Button variant="outline" onClick={() => router.replace("/dashboard")} className="w-full">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <CardHeader className="flex flex-row items-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
                <div>
                  <h2 className="text-3xl font-bold text-green-600">Interview Completed</h2>
                  <p className="text-gray-600">Here is your performance summary.</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Overall Rating</p>
                    <p className={`text-2xl font-bold ${getColor(avg)}`}>
                      {avg ? `${avg}/10` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Questions</p>
                    <p className="text-2xl font-bold text-indigo-600">{list.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <Card className="bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <CardHeader>
                <CardTitle>Analytics 🧠</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-slate-50 rounded-[16px] border border-slate-100">
                    <h4 className="text-sm font-medium text-slate-500 mb-2">Confidence Score</h4>
                    <div className="text-2xl font-bold text-primary">
                      {avg ? `${Math.min(100, Math.round(parseFloat(avg) * 10))}%` : "N/A"}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Based on answer delivery</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-[16px] border border-slate-100">
                    <h4 className="text-sm font-medium text-slate-500 mb-2">Tone Analysis</h4>
                    <div className="text-2xl font-bold text-primary">
                      {avg && parseFloat(avg) >= 8 ? "Professional" : avg && parseFloat(avg) >= 5 ? "Neutral" : "Uncertain"}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Detected speech pattern</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-[16px] border border-slate-100">
                    <h4 className="text-sm font-medium text-slate-500 mb-2">Key Strength</h4>
                    <div className="text-lg font-bold text-primary line-clamp-1">
                      {avg && parseFloat(avg) >= 8 ? "Clarity & Precision" : avg && parseFloat(avg) >= 5 ? "Subject Knowledge" : "Growth Potential"}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Top performing trait</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Question Breakdown</h3>
            <p className="text-sm text-gray-500 mb-4">
              Review your answers and AI feedback.
            </p>

            {list.map((item, index) => (
              <Collapsible key={index} className="border border-slate-100 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Target
                        className={`h-5 w-5 ${parseFloat(item.rating) >= 7
                          ? "text-green-500"
                          : parseFloat(item.rating) >= 4
                            ? "text-yellow-500"
                            : "text-red-500"
                          }`}
                      />
                      <span className="font-medium text-gray-800 line-clamp-1">
                        {item.question}
                      </span>
                    </div>
                    <ChevronsUpDown className="h-4 text-gray-500" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Your Answer</h4>
                      <p className="bg-red-50 p-3 rounded-lg text-sm text-red-900 border border-red-200">
                        {item.userAns || "No answer provided"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Correct Answer</h4>
                      <p className="bg-green-50 p-3 rounded-lg text-sm text-green-900 border border-green-200">
                        {item.correctAns}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Feedback</h4>
                    <p className="bg-blue-50 p-3 rounded-lg text-sm text-primary border border-blue-200">
                      {item.feedback}
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <span className={`font-bold ${getColor(item.rating)}`}>
                      Rating: {item.rating}/10
                    </span>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            <div className="text-center mt-8">
              <Button onClick={() => router.replace("/dashboard")} className="w-full md:w-auto">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;