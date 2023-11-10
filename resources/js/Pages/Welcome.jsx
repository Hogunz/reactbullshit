import { NavBar } from "@/Components/NavBar";
import HeroSection from "@/Components/HeroSection";
import AboutUs from "@/Components/AboutUs";
import Academics from "@/Components/Academics";
import Instructors from "@/Components/Instructors";
import Blogs from "@/Components/Blogs";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <div className="bg-light dark:bg-dark h-screen ">
                <NavBar />
                <HeroSection />
                <AboutUs />
                <Academics />
                <Instructors />
                <Blogs />
            </div>
        </>
    );
}
