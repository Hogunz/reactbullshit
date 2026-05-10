import React, { useState } from "react";
import { NavBar } from "@/Components/NavBar";
import HeroSection from "@/Components/HeroSection";
import AboutUs from "@/Components/AboutUs";
import Academics from "@/Components/Academics";
import Instructors from "@/Components/Instructors";
import Blogs from "@/Components/Blogs";
import EnrollSpin from "@/Components/EnrollSpin";
import Partnership from "@/Pages/Partnership";
import LoadingScreen from "@/Components/LoadingScreen";
import SneakPeek from "@/Components/SneakPeek";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    bscstestimonials,
    events,
    faculties,
    partners,
    siteSettings,
}) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
            <div className={`bg-[#FDFDFC] dark:bg-[#0a0a0a] min-h-screen scroll-smooth transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <NavBar isWelcomePage={true} />
                <HeroSection />
                
                {siteSettings?.show_sneak_peek === 'true' && (
                    <SneakPeek 
                        title={siteSettings?.sneak_peek_title || 'Student Work Sneak Peek'} 
                        subtitle={siteSettings?.sneak_peek_subtitle || 'Get ready to experience the incredible game and web applications developed by our Programming 2 and Web Tech students.'}
                    />
                )}

                <Partnership partners={partners} />
                <AboutUs bscstestimonials={bscstestimonials} />
                <Academics />
                <Instructors faculties={faculties} />
                <Blogs events={events} />
                <EnrollSpin />
            </div>
        </>
    );
}
