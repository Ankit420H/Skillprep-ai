"use client";
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Alert, AlertDescription, AlertTitle } from "@/components/ui";
import { Lightbulb, WebcamIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { MockInterview } from "@/types";

function InterviewClient({ interview }: { interview: MockInterview }) {
  const [webcam, setWebcam] = useState(false);

  const toggleWebcam = () => {
    if (!webcam) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => {
          setWebcam(true);
          toast.success("Webcam and microphone enabled");
        })
        .catch(() => toast.error("Failed to access webcam or microphone"));
    } else {
      setWebcam(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl text-primary tracking-tight">Setup</h2>
        <p className="text-muted-foreground">Check details & devices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <Card className="border-border shadow-soft">
            <CardHeader className="bg-muted/20 border-b border-border pb-4">
              <CardTitle className="text-lg">Role Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Job Role</label>
                <div className="text-lg font-medium text-foreground mt-1">{interview.jobPosition}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tech Stack</label>
                <div className="text-base text-foreground mt-1 leading-relaxed">{interview.jobDesc}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Experience Required</label>
                <div className="text-lg font-medium text-foreground mt-1">{interview.jobExperience} Years</div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-blue-50/50 border-blue-100 text-blue-900">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-700 font-semibold mb-2">Instructions</AlertTitle>
            <AlertDescription className="text-blue-800/80 leading-relaxed">
              Enable camera & mic to start. <strong>5 questions</strong> tailored to this role.
              <br /><br />
              <span className="text-xs font-medium bg-blue-100 px-2 py-1 rounded text-blue-700">
                Privacy: Video is never recorded.
              </span>
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="border-border shadow-soft overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-muted/20 border-b border-border pb-4">
              <CardTitle className="text-lg">Camera & Mic</CardTitle>
              <CardDescription>Verify device access.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6 bg-black/5">
              {webcam ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-primary shadow-lg w-full aspect-video bg-black">
                  <Webcam
                    mirrored={true}
                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    onUserMedia={() => setWebcam(true)}
                    onUserMediaError={() => {
                      toast.error("Webcam access error");
                      setWebcam(false);
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Live
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl border-2 border-dashed border-muted-foreground/30 bg-background flex flex-col items-center justify-center gap-4 text-muted-foreground">
                  <div className="p-4 bg-muted rounded-full">
                    <WebcamIcon className="h-12 w-12 opacity-50" />
                  </div>
                  <p className="text-sm">Camera is currently disabled</p>
                </div>
              )}
            </CardContent>
            <div className="p-6 border-t border-border bg-background">
              <Button
                className="w-full"
                variant={webcam ? "destructive" : "default"}
                onClick={toggleWebcam}
              >
                {webcam ? "Disable Camera" : "Enable Camera & Microphone"}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-border">
        <Link href={`/dashboard/interview/${interview.mockId}/start`}>
          <Button size="lg" className="px-10 text-base shadow-lg shadow-primary/20" disabled={!webcam}>
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewClient;
