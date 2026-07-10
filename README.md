# Skillprep-ai

**An enterprise-grade, full-stack AI Mock Interview Platform.**

Skillprep-ai allows software engineers to simulate technical and behavioral interviews in real-time. By leveraging Google's Gemini AI, the platform generates custom-tailored interview questions based on the candidate's target role, experience level, and job description, then provides instant, actionable feedback on their video/audio responses.

## 🚀 Features

- **AI-Powered Generation:** Dynamically generates interview questions using Google Gemini AI based on user profiles.
- **Real-Time Audio & Video:** Integrated `react-webcam` and WebRTC for speech-to-text recording.
- **Instant AI Feedback:** Answers are analyzed in real-time to provide a rating (out of 10) and constructive feedback.
- **Enterprise Authentication:** Fully secured API and user management powered by Clerk.
- **Serverless Database:** Highly scalable Postgres database hosted on Neon, managed seamlessly via Drizzle ORM.
- **Modern UI/UX:** Built with Tailwind CSS and Radix UI primitives for a sleek, accessible, dark-mode ready interface.

## 🏗️ Architecture & Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript / React 18
- **Styling:** Tailwind CSS + Shadcn UI (Radix)
- **Database:** Neon (Serverless Postgres) + Drizzle ORM
- **Authentication:** Clerk
- **AI Integration:** `@google/generative-ai` (Gemini API)

## 🔒 Security Posture

- **Route Protection:** All Next.js API routes are protected server-side via Clerk's `auth()` helper to prevent unauthorized database mutations.
- **Environment Isolation:** Secrets and API keys are strictly loaded via `.env.local` and excluded from source control.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- A Neon Database URL
- A Clerk Publishable & Secret Key
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ankit420H/Skillprep-ai.git
   cd Skillprep-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   DATABASE_URL=your_neon_db_url
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Initialize Database Schema:**
   ```bash
   npm run db:push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 📄 License

This project is licensed under the MIT License.
