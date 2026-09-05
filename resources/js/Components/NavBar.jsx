import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import DarkMode from './DarkModeToggle';
import { LogoIcon } from './svg/SVGicon';

export function NavBar({ isWelcomePage = false }) {
    const { auth } = usePage().props;
    const [isScrolled, setIsScrolled] = useState(!isWelcomePage);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Smart Scroll Transparency
    useEffect(() => {
        if (!isWelcomePage) {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isWelcomePage]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <header 
                className={`${isWelcomePage ? 'fixed' : 'sticky'} top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
                    isScrolled 
                        ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 py-3 shadow-[0_4px_30px_rgb(0,0,0,0.03)] dark:shadow-none' 
                        : 'bg-transparent py-5'
                }`}
            >
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative z-50">
                        <div className="flex items-center justify-center transition-colors duration-300 text-purple dark:text-white">
                            <LogoIcon />
                        </div>
                        <span className={`font-black tracking-tight text-xl transition-colors duration-300 ${
                            isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
                        }`}>
                            SITE
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
                        <Link href="/" className="px-3 xl:px-4 py-2 font-semibold text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white transition-colors">
                            Home
                        </Link>

                        {/* About Dropdown */}
                        <div className="relative group px-3 xl:px-4 py-2 cursor-pointer">
                            <span className="flex items-center gap-1 font-semibold text-sm xl:text-base text-gray-700 dark:text-gray-300 group-hover:text-purple dark:group-hover:text-white transition-colors">
                                About <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                            </span>
                            {/* Seamless floating popover */}
                            <div className="absolute top-full pt-4 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:-translate-y-1 w-48">
                                <div className="bg-white dark:bg-[#111] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-gray-100 dark:border-white/5 overflow-hidden py-2 flex flex-col backdrop-blur-xl">
                                    <Link href="/History" className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white hover:bg-purple/10 dark:hover:bg-white/5 transition-colors">
                                        History
                                    </Link>
                                    <Link href="/VMO" className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white hover:bg-purple/10 dark:hover:bg-white/5 transition-colors">
                                        V.M.O.
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Academics Dropdown */}
                        <div className="relative group px-3 xl:px-4 py-2 cursor-pointer">
                            <span className="flex items-center gap-1 font-semibold text-sm xl:text-base text-gray-700 dark:text-gray-300 group-hover:text-purple dark:group-hover:text-white transition-colors">
                                Academics <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                            </span>
                            <div className="absolute top-full pt-4 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:-translate-y-1 w-56">
                                <div className="bg-white dark:bg-[#111] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-gray-100 dark:border-white/5 overflow-hidden py-2 flex flex-col backdrop-blur-xl">
                                    <Link href="/ProgramDescription" className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white hover:bg-purple/10 dark:hover:bg-white/5 transition-colors">
                                        Programs
                                    </Link>
                                    <Link href="/Faculty" className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white hover:bg-purple/10 dark:hover:bg-white/5 transition-colors">
                                        Faculty
                                    </Link>
                                    <Link href="/Recognitions" className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white hover:bg-purple/10 dark:hover:bg-white/5 transition-colors">
                                        Recognitions
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link href="/HallOfFame" className="px-3 xl:px-4 py-2 font-semibold text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white transition-colors">
                            Hall of Fame
                        </Link>

                        <Link href="/News&Events" className="px-3 xl:px-4 py-2 font-semibold text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white transition-colors">
                            News & Events
                        </Link>
                        <Link href="/Partners" className="px-3 xl:px-4 py-2 font-semibold text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white transition-colors">
                            Partners
                        </Link>
                        <Link href="/Contact" className="px-3 xl:px-4 py-2 font-semibold text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-purple dark:hover:text-white transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                        {/* Theme Toggle Button */}
                        <div className="flex items-center justify-center p-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <DarkMode />
                        </div>

                        {/* Admin Dashboard & Logout (Only visible if logged in) */}
                        {auth?.user && (
                            <div className="flex items-center gap-1.5">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs xl:text-sm bg-purple/10 dark:bg-purple-950/60 text-purple dark:text-purple-300 border border-purple/20 dark:border-purple-800/60 hover:bg-purple/20 dark:hover:bg-purple-900/60 transition-all shadow-sm hover:scale-105"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    <span>Dashboard</span>
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                    title="Log Out"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                        
                        {/* Enroll Button */}
                        <Link href="/Contact" className="px-6 py-2.5 rounded-full bg-purple dark:bg-white text-white dark:text-gray-900 font-bold text-sm hover:bg-purple-dark dark:hover:bg-gray-100 transition-colors shadow-lg shadow-purple/20 dark:shadow-none hover:-translate-y-0.5 active:translate-y-0 transform duration-200">
                            Enroll Now
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button 
                        className="lg:hidden p-2 text-gray-900 dark:text-white relative z-50 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                </div>
            </header>

            {/* Mobile Push/Cover Navigation Menu */}
            <div className={`fixed inset-0 z-40 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-3xl transition-all duration-500 lg:hidden ${
                isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}>
                <div className="flex flex-col h-full justify-center px-8 sm:px-12 pt-20 pb-12 overflow-y-auto">
                    <nav className="flex flex-col gap-6 text-center">
                        {auth?.user && (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-purple/10 dark:bg-purple-950/60 text-purple dark:text-purple-300 font-extrabold text-xl border border-purple/20 dark:border-purple-800/60 shadow-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    <span>Dashboard</span>
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 py-2 px-6 rounded-xl text-rose-500 font-semibold text-sm hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Log Out</span>
                                </Link>
                            </div>
                        )}

                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-extrabold text-gray-900 dark:text-white hover:text-purple dark:hover:text-purple-light transition-colors">Home</Link>
                        
                        <div className="flex flex-col gap-4">
                            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">About</span>
                            <div className="flex flex-col gap-3">
                                <Link href="/History" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-500 dark:text-gray-400 hover:text-purple dark:hover:text-purple-light">History</Link>
                                <Link href="/VMO" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-500 dark:text-gray-400 hover:text-purple dark:hover:text-purple-light">V.M.O.</Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Academics</span>
                            <div className="flex flex-col gap-3">
                                <Link href="/ProgramDescription" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-500 dark:text-gray-400 hover:text-purple dark:hover:text-purple-light">Programs</Link>
                                <Link href="/Faculty" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-500 dark:text-gray-400 hover:text-purple dark:hover:text-purple-light">Faculty</Link>
                                <Link href="/Recognitions" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-500 dark:text-gray-400 hover:text-purple dark:hover:text-purple-light">Recognitions</Link>
                            </div>
                        </div>

                        <Link href="/News&Events" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-extrabold text-gray-900 dark:text-white hover:text-purple dark:hover:text-purple-light transition-colors">News & Events</Link>
                        <Link href="/HallOfFame" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-extrabold text-gray-900 dark:text-white hover:text-purple dark:hover:text-purple-light transition-colors">Hall of Fame</Link>
                        <Link href="/Partners" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-extrabold text-gray-900 dark:text-white hover:text-purple dark:hover:text-purple-light transition-colors">Partners</Link>
                        <Link href="/Contact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-extrabold text-gray-900 dark:text-white hover:text-purple dark:hover:text-purple-light transition-colors">Contact</Link>
                    </nav>

                    <div className="mt-12 flex flex-col gap-6 items-center border-t border-gray-200 dark:border-white/10 pt-12">
                        <div className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                            <DarkMode />
                        </div>
                        <Link href="/Contact" className="w-full text-center px-8 py-4 rounded-2xl bg-purple dark:bg-white text-white dark:text-gray-900 font-bold text-lg shadow-xl shadow-purple/20 active:scale-95 transition-all">
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
