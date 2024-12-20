"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/new_arrivals.png",
    url: "/collections/676518238e2779ab899eb999",
    bg: "bg-cover",
    // bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/trending.png",
    url: "/collections/676517f88e2779ab899eb993",
    bg: "bg-cover",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/fashion.png",
    url: "/collections/6765175d8e2779ab899eb980",
    bg: "bg-cover",
  },
  {
    id: 4,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/spring.png",
    url: "/collections/674b0682fb5dc48b8e51bc34",
    bg: "bg-cover",
  },
];

const Slide = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:h-[calc(100vh-80px)] h-[calc(50vh-80px)] overflow-hidden ">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg}`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            
            {/* IMAGE CONTAINER */}
            <Link href={slide.url}>

            
            <div className="">
              <Image
                src={slide.img}
                alt=""
                width={2000} height={1000} className="w-screen object-cover"
                // className=" h-full object-cover rounded-lg shadow-md"
                // className="object-cover"
              />
            </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute m-auto lg:bottom-8 flex gap-4 lg:left-[50%] left-[40%]">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;
