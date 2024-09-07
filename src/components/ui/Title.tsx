import React from "react";

interface TitleProps {
  title: string;
  customClass?: string;
}
const Title = ({ title, customClass }: TitleProps) => {
  return (
    <h2 className={`w-full mx-auto font-roboto font-semibold text-3xl md:text-5xl first-letter: ${customClass}`}>
      {title}
    </h2>
  );
};

export default Title;
