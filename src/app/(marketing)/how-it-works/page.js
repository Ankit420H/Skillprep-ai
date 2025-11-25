"use client";

import React from "react";
import { Bot, UserCheck, Settings, Play, Send, ChartBar, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from "@/components/ui";
import Link from "next/link";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck size={32} className="text-primary" />,
      title: "Sign Up or Log In",
      description: "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences."
    },
    {
      icon: <Settings size={32} className="text-primary" />,
      title: "Choose Your Interview Type",
      description: "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals."
    },
    {
      icon: <Play size={32} className="text-primary" />,
      title: "Start the Mock Interview",
      description: "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged."
    },
    {
      icon: <Send size={32} className="text-primary" />,
      title: "Submit Your Answers",
      description: "Respond via text or multiple-choice options. Our intuitive interface tracks your responses and provides a seamless experience."
    },
    {
      icon: <ChartBar size={32} className="text-primary" />,
      title: "Receive Real-Time Feedback",
      description: "Get instant, AI-powered analysis of your responses. Understand your strengths, areas for improvement, and receive detailed scoring."
    },
    {
      icon: <Repeat size={32} className="text-primary" />,
      title: "Continue Practicing",
      description: "Access your interview history, track progress, and keep refining your skills with unlimited mock interviews and adaptive challenges."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-2xl mb-6">
            <Bot className="text-primary" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            How SkillPrep AI Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Master your interviews with AI-powered practice and personalized insights.
            A simple, effective process designed for your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={step.title} className="border-border shadow-soft hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/10 group-hover:text-primary/10 transition-colors">0{index + 1}</span>
                </div>
                <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-muted/30 rounded-3xl p-12 border border-border">
          <h2 className="text-3xl font-bold mb-6">Ready to start practicing?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join thousands of professionals who are improving their interview skills every day.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-10 h-12 text-base shadow-lg shadow-primary/20">
              Start Your Interview Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;