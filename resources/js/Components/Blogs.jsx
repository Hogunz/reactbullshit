import React from "react";
import ButtonLink from "./ButtonLink";

// export const blogData = [
//     {
//         id: 1,
//         author: "CJ Dela Cruz",
//         avatar: "https://site.steps.com.ph/storage/BzkPmaVo1D60tHV5PxweTgdrPsvpKfSZj6Bgp6ew.jpg",
//         title: "New Computers",
//         date: "November 15, 2023",
//         description: (
//             <>
//                 <p className="line-clamp-2 font-inter font-normal text-light/75 leading-[26.4px] pb-[23px] pt-4">
//                     As UdD rises and SITE's preparations to become the Center of
//                     Excellence in IT Education continue, newly purchased
//                     computer units with I7 processors have been installed at
//                     L301. These computers are in addition to the new computers
//                     that UdD students are now using in L302, L303, and the open
//                     laboratory. A room for Computer System Servicing is
//                     currently under construction with new computer units to
//                     watch out for.These are just a few of the accomplishments of
//                     the School of Information Technology Education.
//                 </p>
//             </>
//         ),
//         content: (
//             <>
//                 <p className="font-inter font-light text-[18px] leading-[27px] dark:text-light text-justify">
//                     As UdD rises and SITE's preparations to become the Center of
//                     Excellence in IT Education continue, newly purchased
//                     computer units with I7 processors have been installed at
//                     L301. These computers are in addition to the new computers
//                     that UdD students are now using in L302, L303, and the open
//                     laboratory. A room for Computer System Servicing is
//                     currently under construction with new computer units to
//                     watch out for.These are just a few of the accomplishments of
//                     the School of Information Technology Education.
//                 </p>
//             </>
//         ),
//     },
//     {
//         id: 2,
//         author: "CJ Dela Cruz",
//         avatar: "",
//         title: "Mr. and Ms. SITE",
//         date: "November 15, 2023",
//         description: (
//             <>
//                 <div className="line-clamp-2 font-inter font-normal text-light/75 leading-[26.4px] pb-[23px] pt-4">
//                     𝐋𝐢𝐠𝐡𝐭𝐬, 𝐂𝐚𝐦𝐞𝐫𝐚, 𝐀𝐜𝐭𝐢𝐨𝐧! ✨ The moment we've all been waiting
//                     for is finally here! ✨ The stage is ablaze with excitement,
//                     and the spotlight is poised to capture the essence of true
//                     brilliance as the 𝑺𝒄𝒉𝒐𝒐𝒍 𝒐𝒇 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏 𝑻𝒆𝒄𝒉𝒏𝒐𝒍𝒐𝒈𝒚 𝑬𝒅𝒖𝒄𝒂𝒕𝒊𝒐𝒏
//                     embarks on the quest to crown 𝗠𝗿. 𝗮𝗻𝗱 𝗠𝘀. 𝐒𝐈𝐓𝐄 𝟮𝟬𝟮𝟯! Get
//                     ready to witness a dazzling display of talent, intelligence,
//                     and charisma as our contestants take center stage to
//                     showcase not only their technical prowess but also their
//                     unique personalities that set them apart. As we navigate
//                     through this thrilling search, may the spotlight shine on
//                     those who embody the spirit of SITE, where 𝒊𝒏𝒏𝒐𝒗𝒂𝒕𝒊𝒐𝒏 𝒎𝒆𝒆𝒕𝒔
//                     𝒆𝒍𝒆𝒈𝒂𝒏𝒄𝒆, and 𝒊𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒄𝒆 𝒅𝒂𝒏𝒄𝒆𝒔 𝒘𝒊𝒕𝒉 𝒈𝒓𝒂𝒄𝒆. 👑 On 𝗡𝗼𝘃𝗲𝗺𝗯𝗲𝗿
//                     𝟮𝟰, 𝟮𝟬𝟮𝟯, the stage will come alive as we present an
//                     unforgettable showcase of beauty and brilliance. Mark your
//                     calendars and join us for a celebration like no other, where
//                     every moment is a highlight and every participant is a star
//                     in the making. Here's to the enchanting journey of our 𝗠𝗿.
//                     𝗮𝗻𝗱 𝗠𝘀. 𝐒𝐈𝐓𝐄 𝟮𝟬𝟮𝟯, where dreams unfold and where every
//                     contestant is a story waiting to be told.
//                 </div>
//             </>
//         ),
//         content: (
//             <>
//                 <h1 className="font-inter font-light text-[18px] leading-[27px] dark:text-light text-justify">
//                     <p className="pb-[16px]">𝐋𝐢𝐠𝐡𝐭𝐬, 𝐂𝐚𝐦𝐞𝐫𝐚, 𝐀𝐜𝐭𝐢𝐨𝐧! ✨ </p>
//                     <p className="pb-[16px]">
//                         The moment we've all been waiting for is finally here!
//                         ✨
//                     </p>{" "}
//                     <p className="pb-[16px]">
//                         The stage is ablaze with excitement, and the spotlight
//                         is poised to capture the essence of true brilliance as
//                         the 𝑺𝒄𝒉𝒐𝒐𝒍 𝒐𝒇 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏 𝑻𝒆𝒄𝒉𝒏𝒐𝒍𝒐𝒈𝒚 𝑬𝒅𝒖𝒄𝒂𝒕𝒊𝒐𝒏 embarks
//                         on the quest to crown 𝗠𝗿. 𝗮𝗻𝗱 𝗠𝘀. 𝐒𝐈𝐓𝐄 𝟮𝟬𝟮𝟯!
//                     </p>{" "}
//                     <p className="pb-[16px]">
//                         {" "}
//                         Get ready to witness a dazzling display of talent,
//                         intelligence, and charisma as our contestants take
//                         center stage to showcase not only their technical
//                         prowess but also their unique personalities that set
//                         them apart. As we navigate through this thrilling
//                         search, may the spotlight shine on those who embody the
//                         spirit of SITE, where 𝒊𝒏𝒏𝒐𝒗𝒂𝒕𝒊𝒐𝒏 𝒎𝒆𝒆𝒕𝒔 𝒆𝒍𝒆𝒈𝒂𝒏𝒄𝒆, and
//                         𝒊𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒄𝒆 𝒅𝒂𝒏𝒄𝒆𝒔 𝒘𝒊𝒕𝒉 𝒈𝒓𝒂𝒄𝒆. 👑{" "}
//                     </p>
//                     <p className="pb-[16px]">
//                         On 𝗡𝗼𝘃𝗲𝗺𝗯𝗲𝗿 𝟮𝟰, 𝟮𝟬𝟮𝟯, the stage will come alive as we
//                         present an unforgettable showcase of beauty and
//                         brilliance. Mark your calendars and join us for a
//                         celebration like no other, where every moment is a
//                         highlight and every participant is a star in the making.
//                     </p>{" "}
//                     <p className="pb-[16px]">
//                         {" "}
//                         Here's to the enchanting journey of our 𝗠𝗿. 𝗮𝗻𝗱 𝗠𝘀. 𝐒𝐈𝐓𝐄
//                         𝟮𝟬𝟮𝟯, where dreams unfold and where every contestant is
//                         a story waiting to be told.
//                     </p>
//                 </h1>
//             </>
//         ),
//     },
// ];

export default function Blogs({ events = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Example formatting: YYYY-MM-DD HH:MM:SS
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <>
            <div className="dark:bg-[#232323] bg-light/75 pt-[90px]">
                <div data-aos="fade-up" data-aos-duration="800">
                    <h3 className="font-inter text-center text-[14px] text-[#d399ee] uppercase font-medium tracking-widest mb-4">
                        Blog / News
                    </h3>
                    <h1 className="dark:text-light text-dark/75 text-3xl text-center font-inter font-semibold pb-[50px]">
                        Latest News
                    </h1>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="600"
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 justify-items-center justify-self-center gap-8 pb-[130px]"
                >
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
                        >
                            <a
                                href={route("events.show", {
                                    id: event.id,
                                })}
                            >
                                <img
                                    className=" max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110 w-[370px] h-[280px]"
                                    src={"/storage/" + event.image}
                                    alt=""
                                />
                            </a>
                            <div className="">
                                <a
                                    href={route("events.show", {
                                        id: event.id,
                                    })}
                                    className="line-clamp-1 font-inter font-semibold text-[22px] text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                                >
                                    {event.name}
                                </a>
                                <div className="space-y-8">
                                    <div
                                        className="line-clamp-2 font-inter font-normal text-light/75 leading-[26.4px] pb-[23px] pt-4"
                                        // dangerouslySetInnerHTML={{
                                        //     __html: event.content,
                                        // }}
                                    />

                                    <div className="flex justify-between">
                                        <div>
                                            {" "}
                                            <a
                                                href={route("events.show", {
                                                    id: event.id,
                                                })}
                                            >
                                                <ButtonLink />{" "}
                                            </a>
                                        </div>
                                        <div className="place-self-center">
                                            <p className="font-[18px] leading-[27px] font-inter dark:text-white ">
                                                {formatDate(event.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
