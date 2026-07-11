import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                                S
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">SkillPrep AI</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                            Master your interview skills with AI.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} SkillPrep AI. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Developed by: <span className="font-medium text-foreground">Ankit Kumar Yadav</span> & <span className="font-medium text-foreground">Anup Kumar Dubey</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
