"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
} from "@/components/ui";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Plus, Sparkles, LoaderCircle } from "lucide-react";

import { toast } from "sonner";

const ROLES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
];

const STACKS = {
  "Full Stack Developer": "React, Node.js, Express, MongoDB, TypeScript",
  "Frontend Developer": "React, Vue.js, Angular, TypeScript, Tailwind CSS",
  "Backend Developer": "Python, Django, Flask, Java Spring, PostgreSQL",
  "Software Engineer": "Java, C++, Python, AWS, Microservices",
  "DevOps Engineer": "Docker, Kubernetes, Jenkins, AWS, Azure",
  "Data Scientist": "Python, TensorFlow, PyTorch, Pandas, NumPy",
  "Machine Learning Engineer": "Python, scikit-learn, Keras, TensorFlow",
  "Cloud Engineer": "AWS, Azure, GCP, Terraform, Kubernetes",
  "Mobile App Developer": "React Native, Flutter, Swift, Kotlin",
  "UI/UX Designer": "Figma, Sketch, Adobe XD, InVision",
};

function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const autoFill = (role: keyof typeof STACKS | string) => {
    const stack = STACKS[role as keyof typeof STACKS];
    if (stack) {
      setDescription(stack);
      toast.info(`Auto-filled tech stack for ${role}`);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `You are an interviewer. Job position: ${position}. Job description/tech stack: ${description}. Years of experience: ${experience}.
Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions and answers in strict JSON array format.
Return only valid JSON (no markdown code fences). Example output:
[
  { "q": "...", "a": "..." },
  ...
]`;

    try {
      toast.loading("Generating interview questions with AI...", { id: "generating" });

      const res = await fetch("/api/generate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        toast.error("Failed to generate interview questions", { id: "generating" });
        return;
      }

      const json = await res.json();
      const clean = json.text.replace(/```json\n?|```/g, "").trim();
      const questions = JSON.parse(clean);

      toast.loading("Saving interview...", { id: "generating" });

      const dbRes = await fetch("/api/create-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockId: crypto.randomUUID(),
          jsonMockResp: JSON.stringify(questions),
          jobPosition: position,
          jobDesc: description,
          jobExperience: experience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      if (!dbRes.ok) throw new Error("Failed to save interview");

      const result = await dbRes.json();
      const mockId = result[0]?.mockId || result.mockId;

      if (!mockId) {
        throw new Error("Interview created but ID not returned");
      }

      toast.success("Interview created successfully!", { id: "generating" });
      router.push(`/dashboard/interview/${mockId}`);
    } catch (error) {
      toast.error("Failed to generate interview", { id: "generating" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        className="hover:shadow-md transition-all cursor-pointer border-dashed border-2 flex items-center justify-center h-[150px]"
        onClick={() => setOpen(true)}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-2">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">Add New</h3>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create Interview
            </DialogTitle>
            <DialogDescription>
              Add details about your job position, job description and years of experience.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="job-position" className="text-sm font-medium">Job Role/Position</label>
              <div className="flex gap-2">
                <Input
                  id="job-position"
                  name="jobPosition"
                  placeholder="Ex. Full Stack Developer"
                  value={position}
                  required
                  onChange={(e) => setPosition(e.target.value)}
                  list="jobRoles"
                />
                <datalist id="jobRoles">
                  {ROLES.map((role) => (
                    <option key={role} value={role} />
                  ))}
                </datalist>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => autoFill(position)}
                  disabled={!position}
                  title="Auto-fill Tech Stack"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="job-description" className="text-sm font-medium">Job Description/Tech Stack</label>
              <Textarea
                id="job-description"
                name="jobDescription"
                placeholder="Ex. React, Angular, NodeJs, MySql etc"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="years-experience" className="text-sm font-medium">Years of Experience</label>
              <Input
                id="years-experience"
                name="yearsExperience"
                placeholder="Ex. 5"
                type="number"
                min="0"
                max="70"
                value={experience}
                required
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2 h-4 w-4" /> Generating with AI...
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewInterview;
