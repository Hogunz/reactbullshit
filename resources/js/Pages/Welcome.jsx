import { NavBar } from "@/Components/NavBar";
import HeroSection from "@/Components/HeroSection";
import AboutUs from "@/Components/AboutUs";
import Academics from "@/Components/Academics";
import Instructors from "@/Components/Instructors";
import Blogs from "@/Components/Blogs";
import EnrollSpin from "@/Components/EnrollSpin";
export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    bscstestimonials,
    events,
    faculties,
}) {
    return (
        <>
            <div className="bg-light dark:bg-dark h-screen scroll-smooth ">
                <NavBar />
                <HeroSection />
                <AboutUs bscstestimonials={bscstestimonials} />
                <Academics />
                <Instructors faculties={faculties} />
                <Blogs events={events} />
                <EnrollSpin />
            </div>
        </>
    );
}
