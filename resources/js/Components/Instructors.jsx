import React from "react";

export const instructorsData = [
    {
        id: 1,
        name: "Jann Alfred A. Quinto",
        position: "Dean",
        avatar: "https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/373321447_7326902100658995_4983325593796628411_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHU-rlIPA3AFGLJJVLZ1sfUqOopAURMxESo6ikBREzERAwQUc4eQlCbJ2G1SkMD3nys1U6Zx8FCv-xVwYUrBFeY&_nc_ohc=Iop7SBoRx70AX_2OX06&_nc_ht=scontent.fmnl17-3.fna&oh=00_AfDNOf8ePhPOc6vhU7roScK_icT-v-cKbfvyHqrD5mcXRQ&oe=65597CD1",
        description: (
            <>
                <p className="font-inter font-light text-[18px] text-light leading-[27px]">
                    Mr. Jann Alfred Arzadon-Quinto graduated from Ateneo de
                    Manila University with a degree of BS Management Information
                    Systems and graduated from the Asian Institute of Management
                    with the degree Masters of Science in Innovation and
                    Business. With his educational background he was able to
                    work for multiple companies and contribute to several
                    researches and studies to further advance his career as an
                    IT professional and Teacher.
                </p>
                <br />
                <br />
                <p className="font-inter font-light text-[18px] text-light leading-[27px]">
                    He was a Business Analyst and Project Manager in Smart
                    Communications dealing with several projects that ranges
                    from finance, audit, local and international marketing IT
                    initiatives. Afterwards, he was a Technical Research
                    Assistant for Ateneo de Manila University's Institute of
                    Philippine Culture where he co-authored several papers
                    dealing with eHealth in the Philippines and helped the
                    implementation and training of eHATID LGU, a mobile
                    application used by Rural Health Units all over the
                    Philippines. Afterwards, he worked for Procter and Gamble as
                    an IT Manager where he focused his career on Robotics
                    Process Automation and Enterprise Application Management He
                    was awarded several times for his leadership and innovation
                    for his works in the Robotics Automation Field for the
                    company. He was given several Gold and Silver Employee
                    Awards and the Kaizen Award for his work as a Robotics
                    Process Automation Manager in Asia.
                </p>
                <br />
                <br />
                <p className="font-inter font-light text-[18px] text-light leading-[27px]">
                    With his educational background and Industry experience, he
                    returned to Dagupan City where he aims to enhance, enrich
                    and elevate the School of Information Technology Education's
                    current status in the Academic Arena. He believes that all
                    students should have the opportunity for a brighter future.
                    This lead to the creation of the Arzatech Innovation
                    Laboratory where he aims to provide trainings, bootcamps,
                    hands-on experiences for students to learn exciting new and
                    relevant skills such as Game Development, Robotics,
                    Artificial Intelligence and Machine Learning and many more!
                    He aims to ensure that all Universidad de Dagupan students
                    will be future-ready for the jobs of tomorrow. He is now the
                    Dean of the School of Information Technology Education and
                    the Chief Operating Officer of Universidad de Dagupan. With
                    his initiatives, thrusts, and vision, Universidad de Dagupan
                    students will definitely have a brighter future!
                </p>
            </>
        ),
    },
    {
        id: 2,
        name: "CJ Dela Cruz",
        position: "Faculty",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: (
            <>
                <p className="font-inter font-light text-[18px] text-light leading-[27px]">
                    Mr. Jann Alfred Arzadon-Quinto graduated from Ateneo de
                    Manila University with a degree of BS Management Information
                    Systems and graduated from the Asian Institute of Management
                    with the degree Masters of Science in Innovation and
                    Business. With his educational background he was able to
                    work for multiple companies and contribute to several
                    researches and studies to further advance his career as an
                    IT professional and Teacher.
                </p>
                <br />
                <br />
                <p className="font-inter font-light text-[18px] text-light leading-[27px]">
                    He was a Business Analyst and Project Manager in Smart
                    Communications dealing with several projects that ranges
                    from finance, audit, local and international marketing IT
                    initiatives. Afterwards, he was a Technical Research
                    Assistant for Ateneo de Manila University's Institute of
                    Philippine Culture where he co-authored several papers
                    dealing with eHealth in the Philippines and helped the
                    implementation and training of eHATID LGU, a mobile
                    application used by Rural Health Units all over the
                    Philippines. Afterwards, he worked for Procter and Gamble as
                    an IT Manager where he focused his career on Robotics
                    Process Automation and Enterprise Application Management He
                    was awarded several times for his leadership and innovation
                    for his works in the Robotics Automation Field for the
                    company. He was given several Gold and Silver Employee
                    Awards and the Kaizen Award for his work as a Robotics
                    Process Automation Manager in Asia.
                </p>
                <br />
                <br />
                <p className="font-inter font-light text-[18px] text-light leading-[27px]">
                    With his educational background and Industry experience, he
                    returned to Dagupan City where he aims to enhance, enrich
                    and elevate the School of Information Technology Education's
                    current status in the Academic Arena. He believes that all
                    students should have the opportunity for a brighter future.
                    This lead to the creation of the Arzatech Innovation
                    Laboratory where he aims to provide trainings, bootcamps,
                    hands-on experiences for students to learn exciting new and
                    relevant skills such as Game Development, Robotics,
                    Artificial Intelligence and Machine Learning and many more!
                    He aims to ensure that all Universidad de Dagupan students
                    will be future-ready for the jobs of tomorrow. He is now the
                    Dean of the School of Information Technology Education and
                    the Chief Operating Officer of Universidad de Dagupan. With
                    his initiatives, thrusts, and vision, Universidad de Dagupan
                    students will definitely have a brighter future!
                </p>
            </>
        ),
    },
    // Add more instructor data as needed
];

const Instructors = () => {
    return (
        <>
            <div className="bg-gradient-to-b from-purple via-[#2B2B2B] via-30% to-dark pt-[90px]">
                <h3 className="font-inter text-center text-[14px] text-[#d399ee] uppercase font-medium tracking-widest mb-4">
                    FACULTY
                </h3>
                <h1 className="text-light text-3xl text-center font-inter font-semibold pb-[50px]">
                    Our Instructors
                </h1>

                <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 pb-[130px]">
                    {instructorsData.map((instructor, index) => (
                        <div
                            key={index}
                            className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
                        >
                            <a
                                href={
                                    "/Instructors?instructor=" + instructor.id
                                }
                                className="href"
                            >
                                <img
                                    className="max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110"
                                    src={instructor.avatar}
                                    alt=""
                                />
                            </a>
                            <div>
                                <a
                                    href=""
                                    className="font-inter font-semibold text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                                >
                                    {instructor.name}
                                </a>
                                <h3 className="font-inter font-normal text-light/75 leading-[26.4px]">
                                    {instructor.position}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Instructors;
