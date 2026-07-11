"use client";
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/core/utils/utils";

function Header() {
    const path = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = useCallback(() => {
        if (typeof window !== "undefined") {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);
            return () => window.removeEventListener("scroll", controlNavbar);
        }
    }, [controlNavbar]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/how-it-works", label: "How it works" },
        { href: "/about-us", label: "About" },
    ];

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-5 bg-background/80 backdrop-blur-md border-b border-border z-50 transition-all duration-300 ease-in-out",
                    isVisible ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                    onClick={closeMobileMenu}
                >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">SkillPrep AI</span>
                </Link>

                <nav className="hidden md:flex gap-4 lg:gap-6">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.href}
                            path={path}
                            href={item.href}
                            label={item.label}
                            onClick={closeMobileMenu}
                        />
                    ))}
                </nav>

                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                <div className="hidden md:block">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-10 h-10",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-0 bg-background z-40 md:hidden overflow-hidden pt-16">
                    <div className="h-full overflow-y-auto pb-16">
                        <nav className="space-y-6 p-6">
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.href}
                                    path={path}
                                    href={item.href}
                                    label={item.label}
                                    mobile
                                    onClick={closeMobileMenu}
                                />
                            ))}

                            <div className="pt-6 border-t border-border">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button className="w-full" onClick={closeMobileMenu}>Sign In</Button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <div className="flex justify-center">
                                        <UserButton
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    userButtonAvatarBox: "w-12 h-12 mx-auto",
                                                },
                                            }}
                                        />
                                    </div>
                                </SignedIn>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

interface NavItemProps {
    path: string;
    href: string;
    label: string;
    mobile?: boolean;
    onClick: () => void;
}

function NavItem({ path, href, label, mobile, onClick }: NavItemProps) {
    const isActive = path === href;
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "transition-all duration-300 ease-in-out cursor-pointer rounded-lg",
                mobile ? "block w-full text-lg py-3 text-center" : "px-3 py-2 hover:bg-secondary hover:text-primary",
                isActive ? "text-primary font-bold bg-secondary" : "text-muted-foreground hover:text-primary"
            )}
        >
            {label}
        </Link>
    );
}

export default Header;
