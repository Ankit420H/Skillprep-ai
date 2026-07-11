import Link from 'next/link'
import { Button } from "@/components/ui"

export default function HeroSection() {
    return (
        <div className="bg-background min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
            <div className="mx-auto max-w-3xl text-center z-10 space-y-8">
                <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-8xl font-sans">
                    Interview better.
                </h1>

                <p className="text-xl leading-8 text-muted-foreground max-w-xl mx-auto font-light">
                    Master your skills with clarity and focus. A premium, minimal platform for the modern professional.
                </p>

                <div className="flex items-center justify-center gap-x-6 pt-4">
                    <Link href="/dashboard">
                        <Button size="lg" className="px-10 text-lg h-14 rounded-full">
                            Start Preparation
                        </Button>
                    </Link>
                    <Link href="/how-it-works">
                        <Button variant="ghost" size="lg" className="text-lg h-14 rounded-full text-muted-foreground hover:text-foreground">
                            How it works
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
