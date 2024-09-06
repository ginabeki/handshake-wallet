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
        <div className=" bg-white py-16">
            <div className="section-container max-w-3/4 mx-auto">
                <div className="flex justify-end">
                    <div className="w-3/4 flex flex-col items-end">
                        <Title
                            title="Join millions of people who already trust us with their money"
                            customClass="text-4xl font-bold mb-8 md:p-10"
                        />
                    </div>
                </div>
                <Carousel className="w-full relative bg-[#edfdf3]">
                    <CarouselContent>
                        {reviewsData.map((review, id) => (
                            <CarouselItem key={id}>
                                <div>
                                    <div className="flex items-center">
                                        <div className="w-1/2 pr-8">
                                            <CustomImage
                                                src={review.img}
                                                alt={review.name}
                                                width={400}
                                                height={500}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        <div className="w-1/2 px-2 md:px-6 flex flex-col justify-between">
                                            <p className="text-sm md:text-lg text-gray-600 py-2 md:mb-6">
                                                {review.review}
                                            </p>
                                            <h3 className="md:text-xl font-medium">
                                                {review.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute bottom-4 right-8 md:bottom-20 md:right-20 flex">
                        <CarouselPrevious className="mr-2 w-6 h-6 ml-2 md:w-8 md:h-8" />
                        <CarouselNext className="bg-primary-yellow w-6 h-6 mr-6 md:mr-0 md:w-8 md:h-8" />
                    </div>
                </Carousel>
            </div>
            <Title title="Borderless transfers. Trusted purchases." customClass="text-center my-10 md:my-24" />
        </div>
    );
};

export default Reviews;