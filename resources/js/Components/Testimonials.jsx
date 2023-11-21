import { TestimonialFadeInOut } from "./TestimonialFadeInOut";
export default function Testimonials({ bscstestimonials = [] }) {
    // console.log(bscstestimonials);
    const data = bscstestimonials;
    // const data = [
    //     {
    //         content: "I give my highest respect to this institution, Universidad de Dagupan, that honed me to be a professional. I belong to the first batch of K-12 graduates and one who pursued my senior high school and tertiary education in this institution because I know, I am destined to be successful in their hands. I have witnessed how UdD changed lives not only of their students but also the City of Dagupan as a community and its nearby municipalities. Its vision “to create a community that is responsive to the challenges of the changing world” motivated every member of this institution to Unite, Discover, Develop and work towards its fulfilment.",
    //         image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png",
    //         name: "Jan Julliene Samson Narvasa",
    //         position: "UdD Faculty / Project Manager",
    //     },
    //     {
    //         content: "In any field of expertise, success is built upon a solid foundation, you'll have trouble creating anything of value. A sturdy foundation is acquired by starting with the right learning institution that gives an environment that pushes you beyond your limits, provides a venue where you apply what you have learned, and where educators exemplify an unparalleled commitment to help others become the best version of themselves. All these summarize my journey in Colegio de Dagupan. To the Colegio de Dagupan community, especially to the Arzadon Family, thank you for helping and guiding me during my undergraduate studies. It is such an honor to carry our school's name.",
    //         image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png",
    //         name: "Rex Añonuevo",
    //         position: "CISCO Design Engineer",
    //     },
    //     {
    //         content: "Being a BSIT student can be an exciting and challenging experience. The program provides students with a comprehensive understanding of various aspects of information technology, including programming languages, software development, database management, networking, cybersecurity, and web design. BSIT students frequently get the chance to take classes from seasoned instructors who have practical knowledge in the subject and may offer insightful commentary. They also participate in practical, hands-on learning activities that let them put the academic theories they have learned to use in actual situations. Furthermore, BSIT students frequently engage in groups with their classmates on projects, which helps them build leadership and collaboration skills and gives them networking chances. The curriculum also encourages students to participate in extracurricular activities like tech clubs, hackathons, and coding contests, which may further their professional growth and keep them up to speed with the most recent developments in the industry.",
    //         image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png",
    //         name: "Christopher D. Ocsillos",
    //         position: "UdD Faculty / Project Manager",
    //     },
    //     // Add more data objects as needed
    // ];

    // return <TestimonialFadeInOut  data={data} />;
    return <>{data.length && <TestimonialFadeInOut data={data} />}</>;
}
