import { useState, useEffect } from 'react';
import type { Work } from '../types/workType';

interface Props {
  works: Work[];
  categories: {
    title: string;
    slug: { current: string };
  }[];
}

const CATEGORY_COLORS = [
  '#22c55e',  // green - color 1
  '#f97316',  // orange - color 2
  '#a855f7',  // purple - color 3
];

export default function WorkGallery({ works, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredWorks, setFilteredWorks] = useState<Work[]>(works);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = works.filter(work => 
        work.categories.some(cat => cat.slug.current === selectedCategory)
      );
      setFilteredWorks(filtered);
    } else {
      setFilteredWorks(works);
    }
  }, [selectedCategory, works]);

  return (
    <div className="flex flex-col gap-8 px-8">
      {/* Category Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-white border border-white/20 transition-all flex items-center gap-2
            ${!selectedCategory ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
        >
          <div className={`w-3 h-3 rounded-full bg-white transition-all duration-200
            ${!selectedCategory ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} 
          />
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug.current}
            onClick={() => setSelectedCategory(category.slug.current)}
            className={`px-4 py-2 rounded-full text-white border border-white/20 transition-all flex items-center gap-2
              ${selectedCategory === category.slug.current ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${selectedCategory === category.slug.current ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              style={{ backgroundColor: CATEGORY_COLORS[categories.indexOf(category) % CATEGORY_COLORS.length] }}
            />
            {category.title}
          </button>
        ))}
      </div>

      {/* Works Grid */}
      <div className="flex-1 flex gap-[54px] overflow-x-auto scrollbar-thin max-w-[1400px">
        {filteredWorks.map((work) => (
          <div 
            key={work.slug.current}
            className="min-w-[400px] max-w-[400px] group cursor-pointer"
          >
            <div className="relative aspect-[4/3] mb-4 w-full h-[300px]">
              {work.coverImage?.asset?.url ? (
                <img 
                  src={work.coverImage.asset.url} 
                  alt={work.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg" />
              )}
              {/* Category indicators */}
              <div className="absolute top-4 left-4 flex gap-2 rounded-full border border-gray-300 p-1">
                {work.categories.map((category) => (
                  <div
                    key={category.slug.current}
                    className="w-3 h-3 rounded-full "
                    style={{ backgroundColor: CATEGORY_COLORS[categories.findIndex(cat => cat.slug.current === category.slug.current) % CATEGORY_COLORS.length] }}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-medium text-white group-hover:text-gray-300 transition-colors">
              {work.title}
            </h3>
            <p className="text-white/60 mt-1 line-clamp-2">
              {work.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}