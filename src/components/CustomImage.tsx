"use client";
import { images } from "@/data";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

type CustomImageProps = {
  alt: string;
  src: StaticImageData | string | any;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: any;
};

const CustomImage = ({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(images.logo);
  };

  return (
    <Image
      className={className}
      src={imgSrc}
      onError={handleError}
      width={width}
      height={height}
      alt={alt}
      {...props}
    />
  );
};

export default CustomImage;
