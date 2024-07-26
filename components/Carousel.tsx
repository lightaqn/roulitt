import React from "react";
import { CarouselItems } from "@/utils/constants";
import Image from "next/image";

type Props = {};

const Carousel = (props: Props) => {
  return (
    <div className="flex px-6 py-4 gap-x-2">
      {CarouselItems.map(({ i, img, bg, caption }) => (
        <div
          key={i}
          className={`w-50 h-50 relative ${
            i % 2 === 1 ? bg : "bg-transparent"
          } `}
        >
          <div className="border-white rounded-2xl w-50 h-40">
            <div className="absolute right-0 top-0 border-none h-40 w-30">
              <Image
                src={img}
                className="w-full h-full"
                layout="responsive"
                objectFit="contain"
                alt=""
              />
            </div>
            <div className="absolute w-35 h-30 bottom-0">{caption} </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
