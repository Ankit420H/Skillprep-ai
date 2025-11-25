"use client";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import React from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      const res = await fetch(`/api/delete-interview?mockId=${interview?.mockId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Interview deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete interview");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <Card className="relative bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-primary mb-1">
              {interview?.jobPosition}
            </CardTitle>
            <CardDescription>
              {interview?.jobExperience} Years of Experience
            </CardDescription>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your interview data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Created: {interview?.createdAt}
        </div>
      </CardHeader>

      <CardFooter className="flex gap-3">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() => router.push(`/dashboard/interview/${interview?.mockId}/feedback`)}
        >
          Feedback
        </Button>
        <Button
          className="w-full"
          size="sm"
          onClick={() => router.push(`/dashboard/interview/${interview?.mockId}`)}
        >
          Start
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterviewItemCard;