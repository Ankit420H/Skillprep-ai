"use client";
import { Button, Textarea, Card, CardContent } from "@/components/ui";
import React, { useEffect, useState, useRef } from "react";
import { Mic, StopCircle, Loader2, Camera, CameraOff } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import Webcam from "react-webcam";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  onAnswerSave,
}) => {
  const [answer, setAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [webcam, setWebcam] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      const rec = recognitionRef.current;
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + " ";
          }
        }
        if (transcript.trim()) {
          setAnswer((prev) => (prev + " " + transcript).trim());
        }
      };

      rec.onerror = (event) => {
        toast.error(`Speech recognition error: ${event.error}`);
        setRecording(false);
      };

      rec.onend = () => setRecording(false);
    }
  }, []);

  const toggleWebcam = () => {
    setWebcam((prev) => !prev);
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Speech-to-text not supported");
      return;
    }

    if (recording) {
      recognitionRef.current.stop();
      toast.info("Recording stopped");
    } else {
      recognitionRef.current.start();
      setRecording(true);
      toast.info("Recording started");
    }
  };

  const saveAnswer = async () => {
    if (!answer.trim()) {
      toast.error("Please provide an answer");
      return;
    }

    setLoading(true);

    try {
      const questionText = mockInterviewQuestion[activeQuestionIndex]?.question || mockInterviewQuestion[activeQuestionIndex]?.q;
      const answerText = mockInterviewQuestion[activeQuestionIndex]?.answer || mockInterviewQuestion[activeQuestionIndex]?.a;

      const prompt = `Question: ${questionText}, User Answer: ${answer}. Please give a rating out of 10 and feedback on improvement in JSON format { "rating": <number>, "feedback": <text> }`;

      const res = await fetch("/api/generate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to generate feedback");

      const json = await res.json();
      const clean = json.text.replace(/```json|```/g, "").trim();
      const feedback = JSON.parse(clean);

      const record = {
        mockIdRef: interviewData?.mockId,
        question: questionText,
        correctAns: answerText,
        userAns: answer,
        feedback: feedback?.feedback,
        rating: feedback?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await fetch("/api/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      onAnswerSave?.(record);
      toast.success("Answer recorded successfully");
      setAnswer("");
      if (recognitionRef.current) recognitionRef.current.stop();
      setRecording(false);
    } catch (error) {
      toast.error("Failed to save answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col relative space-y-6">
      {loading && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex flex-col justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-white mb-4" />
          <p className="text-white text-lg">Saving your answer...</p>
        </div>
      )}

      <Card className="bg-black border-none">
        <CardContent className="p-6 flex flex-col items-center">
          {webcam ? (
            <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
              <Webcam
                mirrored={true}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="w-[200px] h-[200px] flex justify-center items-center bg-secondary rounded-lg">
              <p className="text-muted-foreground">Webcam Disabled</p>
            </div>
          )}

          <Button variant="outline" className="mt-4" onClick={toggleWebcam}>
            {webcam ? (
              <>
                <CameraOff className="mr-2 h-4 w-4" /> Disable Webcam
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" /> Enable Webcam
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Button
        disabled={loading}
        variant={recording ? "destructive" : "outline"}
        onClick={toggleRecording}
        size="lg"
      >
        {recording ? (
          <span className="flex items-center gap-2 animate-pulse">
            <StopCircle className="h-5 w-5" /> Stop Recording
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Mic className="h-5 w-5" /> Record Answer
          </span>
        )}
      </Button>

      <Textarea
        id="user-answer"
        name="userAnswer"
        className="w-full min-h-[120px]"
        placeholder="Your answer will appear here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <Button
        className="w-full"
        onClick={saveAnswer}
        disabled={loading || !answer.trim()}
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;