"use client";

import { images } from "@/data";
import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";

type CustomImageProps = {
  alt: string;
  src: StaticImageData | string | Promise<string | null>;
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
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(images.logo);

  useEffect(() => {
    const loadImage = async () => {
      if (src instanceof Promise) {
        const resolvedSrc = await src;
        if (resolvedSrc) {
          setImgSrc(resolvedSrc);
        }
      } else {
        setImgSrc(src);
      }
    };

    loadImage();
  }, [src]);

  const handleError = () => {
    setImgSrc(images.logo);
  };

  // Check if the src is a base64 data URL
  const isBase64 = typeof imgSrc === 'string' && imgSrc.startsWith('data:image');

  if (isBase64) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        {...props}
      />
    );
  }

  return (
    <Image
      className={className}
      src={imgSrc}
      onError={handleError}
      width={width || 100}
      height={height || 100}
      alt={alt}
      {...props}
    />
  );
};

export default CustomImage;