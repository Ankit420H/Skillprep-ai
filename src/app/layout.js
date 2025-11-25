import "@/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
  metadataBase: new URL('https://www.skillprepai.com'),
  title: {
    default: 'SkillPrep AI - Interview better.',
    template: '%s | SkillPrep AI'
  },
  description: 'A premium, minimal interview preparation platform. Master your skills with clarity and focus.',
  keywords: [
    'interview preparation',
    'mock interviews',
    'career development',
    'SkillPrep AI',
    'AI interview coach'
  ],
  authors: [{ name: 'SkillPrep AI Team' }],
  creator: 'SkillPrep AI',
  publisher: 'SkillPrep AI',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.skillprepai.com',
    title: 'SkillPrep AI - Interview better.',
    description: 'A premium, minimal interview preparation platform. Master your skills with clarity and focus.',
    siteName: 'SkillPrep AI',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SkillPrep AI - Interview better.',
    description: 'A premium, minimal interview preparation platform. Master your skills with clarity and focus.',
    creator: '@SkillPrepAI',
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link href="https://api.fontshare.com/v2/css?f[]=nohemi@400,500,600,700,800&display=swap" rel="stylesheet" />
        </head>
        <body
          className={`
            antialiased 
            min-h-screen 
            flex 
            flex-col 
            bg-background 
            text-foreground 
            font-sans
          `}
        >
          <a
            href="#main-content"
            className="
              absolute 
              top-[-999px] 
              left-[-999px] 
              z-[-1] 
              focus:top-0 
              focus:left-0 
              focus:z-50 
              p-4 
              bg-primary 
              text-primary-foreground
            "
          >
            Skip to main content
          </a>

          <Header />
          <Toaster />

          <main
            id="main-content"
            className="
              flex-grow 
              pt-16 
              sm:pt-20 
              max-w-7xl 
              mx-auto 
              w-full 
              px-4 
              sm:px-6 
              lg:px-8
            "
          >
            {children}
          </main>

          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "SkillPrep AI",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "A premium, minimal interview preparation platform. Master your skills with clarity and focus."
              })
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}