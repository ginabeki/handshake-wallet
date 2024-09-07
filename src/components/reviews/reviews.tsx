import React from "react";
import Title from "../ui/Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { reviewsData } from "./reviewsData";
import CustomImage from "../CustomImage";

const Reviews = () => {
  return (
    <section className="w-full mx-auto">
      <div className="section-container py-10">
        <div className="md:ml-auto md:w-3/4">
          <Title
            title="Join millions of people who already trust us with their money"
            customClass="text-4xl font-bold mb-8 md:p-10"
          />
        </div>

        <Carousel className="w-full bg-[#edfdf3] rounded-xl overflow-hidden">
          <CarouselContent className="mb-8 md:mb-0">
            {reviewsData.map((review, id) => (
              <CarouselItem
                key={id}
                className="py-6 flex flex-col md:flex-row items-center justify-between gap-5"
              >
                <div className="w-full md:w-1/3 h-full max-h-[250px]">
                  <CustomImage
                    src={review.img}
                    alt={review.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-center object-fit"
                  />
                </div>

                <div className="w-full md:w-2/3 px-5 space-y-4 flex flex-col justify-between">
                  <p className="text-sm text-center md:text-start md:text-lg text-gray-600 py-2 md:mb-6">
                    {review.review}
                  </p>
                  <h3 className="md:text-xl font-medium text-center md:text-start">
                    {review.name}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-0 py-8 md:py-0 right-[50%] md:bottom-20 md:right-20 flex">
            <CarouselPrevious className="mr-0 md:mr-2 w-6 h-6 ml-2 md:w-8 md:h-8" />
            <CarouselNext className="bg-primary-yellow w-6 h-6 mr-0 md:mr-0 md:w-8 md:h-8" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
