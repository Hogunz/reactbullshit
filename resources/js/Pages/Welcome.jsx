import React, { useState } from "react";
import { NavBar } from "@/Components/NavBar";
import HeroSection from "@/Components/HeroSection";
import AboutUs from "@/Components/AboutUs";
import Academics from "@/Components/Academics";
import Instructors from "@/Components/Instructors";
import Blogs from "@/Components/Blogs";
import EnrollSpin from "@/Components/EnrollSpin";
import Partnership from "@/Pages/Partnership";
import Highlights from "@/Components/Highlights";
import LoadingScreen from "@/Components/LoadingScreen";
import { Head } from "@inertiajs/react";
import { SakuraBackground } from "@/Components/SakuraBackground";

export default function Welcome({
    auth,
    bscstestimonials,
    events,
    faculties,
    partners,
    siteSettings,
}) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <Head title="School of Information Technology Education | Universidad de Dagupan" />
            {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
            <div
                className={`bg-[#FDFDFC] dark:bg-[#0a0a0a] min-h-screen scroll-smooth relative overflow-x-hidden transition-opacity duration-500 ${
                    isLoading ? "opacity-0" : "opacity-100"
                }`}
            >
                <SakuraBackground petalCount={20} />

                <NavBar isWelcomePage={true} />
                <HeroSection />

                {(siteSettings?.show_highlights === 'true' || siteSettings?.show_sneak_peek === 'true') && (
                    <Highlights
                        badge={siteSettings?.highlight_badge !== undefined ? siteSettings.highlight_badge : 'FEATURED SPOTLIGHT'}
                        title={siteSettings?.highlight_title || siteSettings?.sneak_peek_title || 'Hall of Fame Showcase'}
                        subtitle={siteSettings?.highlight_subtitle || siteSettings?.sneak_peek_subtitle || 'The results are in! Explore the elite game and web applications developed by our talented IT students.'}
                        buttonText={siteSettings?.highlight_button_text || 'Enter the Showcase'}
                        buttonLink={siteSettings?.highlight_button_link || '/HallOfFame'}
                        mediaPath={siteSettings?.highlight_media_path || siteSettings?.sneak_peek_video || null}
                        mediaType={siteSettings?.highlight_media_type || 'video'}
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
