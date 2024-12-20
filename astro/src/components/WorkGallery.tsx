import { useState, useEffect, useRef } from 'react';
import type { Work } from '../types/workType';
import gsap from 'gsap';
import { atom } from 'nanostores';

interface Props {
  works: Work[];
  categories: {
    title: string;
    slug: { current: string };
  }[];
}

// CONSTANTS AND THEME
const CATEGORY_COLORS = [
  '#22c55e',  // green - color 1
  '#f97316',  // orange - color 2
  '#a855f7',  // purple - color 3
];

export type Theme = 'dark' | 'light';

export const $theme = atom<Theme>('dark');

export function setTheme(theme: Theme) {
  $theme.set(theme);
  document.documentElement.setAttribute('data-theme', theme);
}

// MAIN COMPONENT
export default function WorkGallery({ works, categories }: Props) {
  // STATE AND REFS
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredWorks, setFilteredWorks] = useState<Work[]>(works);
  const containerRef = useRef<HTMLDivElement>(null);

  // ANIMATION EFFECT
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.children;
    
    // Create single timeline for better performance
    const tl = gsap.timeline();
    
    tl.to(cards, {
      opacity: 0,
      duration: 0.2,
      stagger: 0.02,
      onComplete: () => {
        if (selectedCategory) {
          const filtered = works.filter(work => 
            work.categories.some(cat => cat.slug.current === selectedCategory)
          );
          setFilteredWorks(filtered);
        } else {
          setFilteredWorks(works);
        }
      }
    })
    .to(cards, {
      opacity: 1,
      duration: 0.2,
      stagger: 0.02,
      delay: 0.1
    });

    return () => {
      tl.kill();
    };
  }, [selectedCategory, works]);

  return (
    <div className="flex flex-col gap-4 md:gap-8 px-4 md:px-8">
      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-2 md:gap-4">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-sm md:text-base border border-white/20 transition-all flex items-center gap-2
            ${!selectedCategory ? 'opacity-100' : 'opacity-70'}`}
        >
          <div className={`w-2 md:w-3 h-2 md:h-3 rounded-full bg-white transition-all duration-200
            ${!selectedCategory ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} 
          />
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug.current}
            onClick={() => setSelectedCategory(category.slug.current)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-sm md:text-base border border-white/20 transition-all flex items-center gap-2
              ${selectedCategory === category.slug.current ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
          >
            <div 
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300
                ${selectedCategory === category.slug.current ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              style={{ backgroundColor: CATEGORY_COLORS[categories.indexOf(category) % CATEGORY_COLORS.length] }}
            />
            {category.title}
          </button>
        ))}
      </div>

    {/* WORK CARDS GRID */}
<div 
  ref={containerRef}
  className="flex-1 flex flex-col md:flex-row gap-4 md:gap-[54px] overflow-x-auto scrollbar-thin pb-4 md:pb-0"
>
  {filteredWorks.map((work) => (
    <a 
      key={work.slug.current}
      href={`/work/${work.slug.current}`}
      className="min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[400px] group cursor-pointer flex-shrink-0"
    >
      <div className="relative aspect-[4/3] mb-3 md:mb-4 w-full h-[300px] overflow-hidden rounded-lg">
        <img 
          src={work.coverImage.asset.url}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-200 ease-out opacity-[70%] hover:opacity-[85%]"
        />
        
        <div className="absolute top-4 left-4 flex gap-1.5">
          {work.categories.map((category, index) => (
            <div 
              key={category.slug.current}
              className="w-2 h-2 rounded-full border border-white"
              style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
            />
          ))}
        </div>
      </div>

      {/* Card Content */}
      <h3 className="text-xl font-medium text-white">
        {work.title}
      </h3>
      <p className="text-white/60 mt-1 line-clamp-2">
        {work.description}
      </p>
    </a>
  ))}
</div>
  </div>
  );
}