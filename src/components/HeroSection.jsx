import React from 'react';
import heading from '../assets/images/hero/heading.png';
import hero1 from '../assets/images/hero/hero1.png';
import hero2 from '../assets/images/hero/hero2.png';
import hero3 from '../assets/images/hero/hero3.png';
import hero4 from '../assets/images/hero/hero4.png';

const HeroSection = () => {
  return (
    <section className="w-full px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Left: Heading */}
        <div className="flex justify-start items-center w-full lg:w-1/2">
          <img src={heading} alt="Heading" className="mx-auto lg:mx-0 w-4/5 lg:w-full" />
        </div>

        {/* Right: Image Grid */}
        <div className="flex w-full lg:w-1/2 gap-4">
          {/* Left Subsection (hero1 + hero4 overlay) */}
          <div className="relative flex justify-end  w-2/3">
            <img src={hero1} alt="Hero 1" className="w-4/5 z-10 " />
            <img
              src={hero4}
              alt="Hero 4"
              className="absolute top-30 right-4 w-2/5 lg:w-2/5 translate-x-1/4 z-20"
            />
          </div>

          {/* Right Subsection (hero2 top, hero3 bottom) */}
          <div className="flex flex-col justify-between w-1/2 gap-4">
            <img src={hero2} alt="Hero 2" className="w-full h-auto object-contain" />
            <img src={hero3} alt="Hero 3" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
