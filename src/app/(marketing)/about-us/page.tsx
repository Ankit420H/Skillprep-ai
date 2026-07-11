'use client'
import { useState } from 'react'
import {
  Users,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Rocket
} from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const tabContent: Record<string, { icon: React.ReactNode; content: React.ReactNode }> = {
    mission: {
      icon: <Target className="mr-2 h-5 w-5" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-xl font-medium text-primary">Our Mission</p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SkillPrep AI is on a mission to revolutionize interview preparation by providing personalized, intelligent AI coaching tailored to individual career aspirations.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With SkillPrep AI, the goal is to bridge the gap between preparation and success, empowering users to unlock their full potential and land their dream roles.
          </p>
        </div>
      )
    },
    story: {
      icon: <BookOpen className="mr-2 h-5 w-5" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-xl font-medium text-primary">Our Story</p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The idea for SkillPrep AI was born from firsthand experiences with the challenges of interview preparation. As developers, we wanted to create a platform that simplifies the process and builds confidence.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This journey has been a testament to the power of passion and innovation, leading to the creation of an impactful tool for career growth.
          </p>
        </div>
      )
    },
    approach: {
      icon: <Rocket className="mr-2 h-5 w-5" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-xl font-medium text-primary">Our Approach</p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SkillPrep AI leverages advanced AI algorithms to generate dynamic, contextually relevant interview questions based on your professional background and goals.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Through real-time analysis and feedback, the platform provides actionable insights, enabling users to improve with every mock interview attempt.
          </p>
        </div>
      )
    }
  }

  const coreValues = [
    {
      icon: <Award className="w-10 h-10 text-primary mb-4" />,
      title: "Continuous Learning",
      description: "Always striving to improve and provide better tools for growth."
    },
    {
      icon: <Users className="w-10 h-10 text-primary mb-4" />,
      title: "Empowerment",
      description: "Supporting individuals in building confidence and achieving professional success."
    },
    {
      icon: <Briefcase className="w-10 h-10 text-primary mb-4" />,
      title: "Excellence",
      description: "Delivering high-quality, impactful features to simplify interview preparation."
    }
  ]

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            About SkillPrep AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Empowering professionals to ace interviews through intelligent, personalized AI coaching.
          </p>
        </div>

        <Card className="mb-20 border-border shadow-soft overflow-hidden">
          <div className="flex border-b border-border bg-muted/30">
            {Object.keys(tabContent).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-none h-14 text-base ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
              >
                {tabContent[tab].icon}
                <span className="capitalize font-medium">{tab}</span>
              </Button>
            ))}
          </div>
          <CardContent className="p-10 md:p-14 min-h-[300px] flex items-center">
            {tabContent[activeTab].content}
          </CardContent>
        </Card>

        <div>
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-border shadow-soft group">
                <CardContent className="p-8">
                  <div className="flex justify-center p-3 bg-primary/5 rounded-full w-fit mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage