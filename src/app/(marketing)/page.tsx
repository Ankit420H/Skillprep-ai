'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, Button } from '@/components/ui'
import { ArrowRight, Code, Brain, FileText, Book, Globe, Target, Award, PenTool, Star, ChevronDown, ChevronUp } from 'lucide-react'

interface ResourceLink {
    name: string;
    url: string;
}

interface Resource {
    title: string;
    description: string;
    icon: React.ReactNode;
    links: ResourceLink[];
}

const ResourceCard = ({ icon, title, description, links }: Resource) => (
    <Card className="h-full bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
        <CardContent className="p-8">
            <div className="h-12 w-12 rounded-full bg-blue-50/50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                <div className="text-blue-600">
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
                {description}
            </p>
            <div className="space-y-3">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3 group-hover/link:bg-blue-600 transition-colors"></span>
                        {link.name}
                        <ArrowRight className="ml-2 w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-blue-600" />
                    </a>
                ))}
            </div>
        </CardContent>
    </Card>
)

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState('tech')
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index)
    }

    const resourceCategories: Record<string, { label: string; icon: React.ReactNode; resources: Resource[] }> = {
        tech: {
            label: "Technical",
            icon: <Code className="w-4 h-4" />,
            resources: [
                {
                    title: "Coding Platforms",
                    description: "Master algorithmic problem-solving with top-tier practice environments.",
                    icon: <Code className="w-6 h-6" />,
                    links: [
                        { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
                        { name: "LeetCode", url: "https://leetcode.com/" },
                        { name: "HackerRank", url: "https://www.hackerrank.com/" },
                        { name: "CodeChef", url: "https://www.codechef.com/" }
                    ]
                },
                {
                    title: "System Design & Interviews",
                    description: "Deep-dive resources for architectural patterns and technical interviews.",
                    icon: <Target className="w-6 h-6" />,
                    links: [
                        { name: "InterviewBit", url: "https://www.interviewbit.com/" },
                        { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
                        { name: "Pramp", url: "https://www.pramp.com/" }
                    ]
                }
            ]
        },
        aptitude: {
            label: "Aptitude",
            icon: <Brain className="w-4 h-4" />,
            resources: [
                {
                    title: "Logical Reasoning",
                    description: "Sharpen your quantitative and analytical reasoning capabilities.",
                    icon: <PenTool className="w-6 h-6" />,
                    links: [
                        { name: "IndiaBix", url: "https://www.indiabix.com/" },
                        { name: "Freshersworld", url: "https://www.freshersworld.com/aptitude-questions" },
                        { name: "MathsGuru", url: "https://www.mathsguru.com/reasoning-questions/" }
                    ]
                },
                {
                    title: "Competitive Exams",
                    description: "Comprehensive preparation materials for placement and entrance exams.",
                    icon: <Award className="w-6 h-6" />,
                    links: [
                        { name: "GATE Overflow", url: "https://gateoverflow.in/" },
                        { name: "Career Power", url: "https://careerpower.in/" },
                        { name: "Brilliant.org", url: "https://brilliant.org/" }
                    ]
                }
            ]
        },
        interview: {
            label: "Interview",
            icon: <FileText className="w-4 h-4" />,
            resources: [
                {
                    title: "Preparation Guides",
                    description: "Expert-curated guides to navigate every stage of the interview process.",
                    icon: <Book className="w-6 h-6" />,
                    links: [
                        { name: "AmbitionBox Tips", url: "https://www.ambitionbox.com/" },
                        { name: "InterviewStreet", url: "https://www.interviewstreet.com/" },
                        { name: "Shiksha Career Guide", url: "https://www.shiksha.com/" }
                    ]
                },
                {
                    title: "Learning Paths",
                    description: "Structured courses to upskill in specific domains and technologies.",
                    icon: <Globe className="w-6 h-6" />,
                    links: [
                        { name: "Coursera", url: "https://www.coursera.org/" },
                        { name: "edX", url: "https://www.edx.org/" },
                        { name: "Udacity", url: "https://www.udacity.com/" }
                    ]
                }
            ]
        }
    }

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Software Engineer at Google",
            content: "SkillPrep AI was instrumental in my preparation. The behavioral analysis helped me refine my soft skills, which was the missing piece in my interviews.",
            avatar: "SC"
        },
        {
            name: "Michael Ross",
            role: "Product Manager at Stripe",
            content: "The system design resources are top-notch. I felt incredibly confident going into my technical rounds. Highly recommended!",
            avatar: "MR"
        },
        {
            name: "Priya Patel",
            role: "Frontend Dev at Amazon",
            content: "I love the minimal, distraction-free interface. It kept me focused on what matters—improving my answers.",
            avatar: "PP"
        }
    ]

    const faqs = [
        {
            question: "How does the AI analysis work?",
            answer: "Our AI analyzes your video and audio responses to evaluate clarity, confidence, and content relevance, providing actionable feedback to improve your delivery."
        },
        {
            question: "Is my interview data private?",
            answer: "Absolutely. We do not record video streams, and all audio data is processed securely. Your privacy is our top priority."
        },
        {
            question: "Can I practice for specific roles?",
            answer: "Yes! You can customize your mock interviews based on job role, tech stack, and experience level to get the most relevant questions."
        }
    ]

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 mb-8 shadow-sm hover:border-blue-200 transition-colors cursor-default">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                        New: AI-Powered Behavioral Analysis
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 max-w-5xl mx-auto leading-[1.1]">
                        Master your interview. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Own your future.</span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        The intelligent interview coach for ambitious professionals.
                        Practice with precision, receive instant feedback, and perform with absolute confidence.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
                        <Link href="/dashboard">
                            <Button size="lg" className="h-14 px-8 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 rounded-full">
                                Start Practice <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/how-it-works">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-full">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
                    <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
                </div>
            </section>

            {/* Intelligence Hub Section */}
            <div className="bg-slate-50/50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                            Intelligence Hub
                        </h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Curated, data-driven resources to benchmark your skills and elevate your technical readiness.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center mb-16 gap-3">
                        {Object.keys(resourceCategories).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`
                  px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2.5
                  ${activeCategory === category
                                        ? "bg-white text-blue-600 shadow-md shadow-slate-100 ring-1 ring-slate-200"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                                    }
                `}
                            >
                                {resourceCategories[category].icon}
                                {resourceCategories[category].label}
                            </button>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
                        {resourceCategories[activeCategory].resources.map((resource, index) => (
                            <ResourceCard key={index} {...resource} />
                        ))}
                    </div>

                    {/* Performance Accelerators */}
                    <div className="py-16">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                Performance Accelerators
                            </h2>
                            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                                Enhance your preparation with these supplementary tools designed for high achievers.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Resume Building",
                                    description: "Create a standout professional resume that gets you noticed.",
                                    icon: <FileText className="w-6 h-6 text-blue-600" />,
                                    url: "https://www.canva.com/resumes/templates/"
                                },
                                {
                                    title: "Mock Interviews",
                                    description: "Practice with AI-powered simulations to refine your delivery.",
                                    icon: <Target className="w-6 h-6 text-blue-600" />,
                                    url: "/dashboard"
                                },
                                {
                                    title: "Skill Assessment",
                                    description: "Identify gaps and improve your key technical competencies.",
                                    icon: <Brain className="w-6 h-6 text-blue-600" />,
                                    url: "https://www.skillvalue.com/"
                                }
                            ].map((tip, index) => (
                                <Link
                                    key={index}
                                    href={tip.url}
                                    target={tip.url.startsWith('http') ? "_blank" : "_self"}
                                    className="group block h-full"
                                >
                                    <div className="h-full bg-white rounded-[20px] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                            {tip.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {tip.title}
                                        </h3>
                                        <p className="text-slate-500 mb-6 leading-relaxed">
                                            {tip.description}
                                        </p>
                                        <div className="flex items-center text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                            Explore Tool <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Professionals</h2>
                        <p className="text-slate-500 text-lg">See what others are achieving with SkillPrep AI.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <Card key={i} className="h-full bg-white rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-slate-600 mb-6 leading-relaxed">&quot;{t.content}&quot;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{t.name}</div>
                                            <div className="text-xs text-slate-500">{t.role}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-500 text-lg">Everything you need to know about SkillPrep AI.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-semibold text-slate-900">{faq.question}</span>
                                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}