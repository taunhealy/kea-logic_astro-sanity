import { useState } from 'react';

interface Process {
  title: string;
  description: string;
  stepNumber: number;
  icon: {
    asset: {
      url: string;
    };
  };
  color: string;
}

interface ProcessListProps {
  processes: Process[];
}

export default function ProcessList({ processes }: ProcessListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-row gap-[54px] h-full w-full">
      <div className="process-headings h-full w-full flex flex-col gap-0 items-left mt-auto mb-auto">
        {processes.map((process, index) => (
          <div 
            key={process.stepNumber}
            className="flex flex-col gap-[16px] text-left process-item cursor-pointer" 
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {process.icon && (
              <div 
                className="w-16 h-16 mb-4 flex items-center justify-center rounded-full transition-all duration-300" 
                style={{ backgroundColor: process.color }}
              >
                <img
                  src={process.icon.asset.url}
                  alt={process.title}
                  className="w-8 h-8"
                />
              </div>
            )}
            <h3 className="text-[32px] font-['Inter'] font-medium mb-2 text-text-primary transition-colors duration-300 hover:text-brand">
              {process.title}
            </h3>
          </div>
        ))}
      </div>
      <div className="process-description w-full flex items-center justify-left relative">
        {processes.map((process, index) => (
          <p 
            key={process.stepNumber}
            className={`font-['Inter'] text-[21px] text-white transition-opacity duration-300 absolute
              ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {process.description}
          </p>
        ))}
      </div>
    </div>
  );
}