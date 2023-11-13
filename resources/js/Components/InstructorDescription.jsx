import React from "react";
import ButtonLink from "./buttons/ButtonLink";
import {
    LocationIcon,
    PhoneIcon,
    MessageIcon,
    FinderIcon,
} from "./svg/SVGicon";
import GoogleMap from "./GoogleMap";
const instructorsData = [
    {
        id: 1,
        name: "Jann Alfred Quinto",
        position: "faculty",
        avatar: "https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/373321447_7326902100658995_4983325593796628411_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHU-rlIPA3AFGLJJVLZ1sfUqOopAURMxESo6ikBREzERAwQUc4eQlCbJ2G1SkMD3nys1U6Zx8FCv-xVwYUrBFeY&_nc_ohc=nbmT8YFVNLQAX9AqaHt&_nc_ht=scontent.fmnl17-3.fna&oh=00_AfB8En8XVNWIi2B_6UYrc5sVMA39o2BBXoM2S1OPrurrMA&oe=65558851",
    },
    {
        id: 2,
        name: "CJ Dela Cruz",
        position: "Faculty",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Add more instructor data as needed
];

const InstructorDescription = ({ id }) => {
    const instructor = instructorsData.filter((i) => i.id == id)[0];

    return (
        <>
            <div className="dark:bg-dark">
                <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[100px] pb-[90px]">
                    {instructor.name}
                </div>
            </div>
            <div className="dark:bg-[#232323]">
                <div class="mx-auto max-w-6xl grid grid-cols-2">
                    <div className="border max-w-xl sticky inset-x-0 top-14 bottom-0 max-h-full lg:p-0 w-[386.09px] h-[495.8px] flex justify-center items-center">
                        <div className="">
                            <img className="max-w-xs object-scale-down w-[346.09px] h-[300px] " src={instructor.avatar} alt="" />
                        </div>
                    </div>
                    <div className="max-w-3xl">
                        <p className="font-inter font-light text-[18px] text-light leading-[27px]">Mr. Jann Alfred Arzadon-Quinto graduated from Ateneo de Manila University with a degree of BS Management Information Systems and graduated from the Asian Institute of Management with the degree Masters of Science in Innovation and Business. With his educational background he was able to work for multiple companies and contribute to several researches and studies to further advance his career as an IT professional and Teacher.</p>
                        <br /><br /><p className="font-inter font-light text-[18px] text-light leading-[27px]">He was a Business Analyst and Project Manager in Smart Communications dealing with several projects that ranges from finance, audit, local and international marketing IT initiatives. Afterwards, he was a Technical Research Assistant for Ateneo de Manila University's Institute of Philippine Culture where he co-authored several papers dealing with eHealth in the Philippines and helped the implementation and training of eHATID LGU, a mobile application used by Rural Health Units all over the Philippines. Afterwards, he worked for Procter and Gamble as an IT Manager where he focused his career on Robotics Process Automation and Enterprise Application Management He was awarded several times for his leadership and innovation for his works in the Robotics Automation Field for the company. He was given several Gold and Silver Employee Awards and the Kaizen Award for his work as a Robotics Process Automation Manager in Asia.</p>
                        <br /><br /><p className="font-inter font-light text-[18px] text-light leading-[27px]">With his educational background and Industry experience, he returned to Dagupan City where he aims to enhance, enrich and elevate the School of Information Technology Education's current status in the Academic Arena. He believes that all students should have the opportunity for a brighter future. This lead to the creation of the Arzatech Innovation Laboratory where he aims to provide trainings, bootcamps, hands-on experiences for students to learn exciting new and relevant skills such as Game Development, Robotics, Artificial Intelligence and Machine Learning and many more! He aims to ensure that all Universidad de Dagupan students will be future-ready for the jobs of tomorrow. He is now the Dean of the School of Information Technology Education and the Chief Operating Officer of Universidad de Dagupan. With his initiatives, thrusts, and vision, Universidad de Dagupan students will definitely have a brighter future!</p>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstructorDescription;


