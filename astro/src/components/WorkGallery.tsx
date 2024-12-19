import { useState, useEffect } from 'react';
import type { Work } from '../types/workType';
import { urlForImage } from '../lib/urlForImage';

interface Props {
  works: Work[];
  categories: {
    title: string;
    slug: { current: string };
  }[];
}

export default function WorkGallery({ works, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Raw Works:', works);
    // Check if works is an array of references
    const hasUnresolvedReferences = works?.some(work => work._type === 'reference');
    if (hasUnresolvedReferences) {
      console.warn('Works contains unresolved references');
    }
    setIsLoading(false);
  }, [works]);

  const filteredWorks = selectedCategory && works
    ? works.filter(work => 
        work.categories?.some(cat => cat.slug.current === selectedCategory)
      )
    : works;

  // Placeholder data for empty states
  const placeholderCategories = [
    { title: 'Web', slug: { current: 'web' } },
    { title: 'Mobile', slug: { current: 'mobile' } },
    { title: 'Design', slug: { current: 'design' } }
  ];

  const placeholderWorks = Array(3).fill(null).map((_, index) => ({
    title: 'Loading Project...',
    slug: { current: `placeholder-${index}` },
    categories: [{ title: 'Loading...', slug: { current: `loading-${index}` } }],
    thumbnail: null
  }));

  const displayCategories = categories?.length ? categories : placeholderCategories;
  const displayWorks = (!works?.length || isLoading) ? placeholderWorks : filteredWorks;

  return (
    <div className="flex flex-row gap-8 px-8">
      <div className="flex flex-col gap-4 pt-4">
        <div 
          onClick={() => setSelectedCategory(null)}
          className={`w-6 h-6 rounded-full bg-orange-500 cursor-pointer transition-transform duration-300 hover:scale-110 ${
            !selectedCategory ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
          }`}
        />
        {displayCategories.map((category) => (
          <div
            key={category.slug.current}
            onClick={() => setSelectedCategory(category.slug.current)}
            className={`w-6 h-6 rounded-full bg-green-500 cursor-pointer transition-transform duration-300 hover:scale-110 ${
              selectedCategory === category.slug.current ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex gap-[54px] overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        {displayWorks.map((work, index) => (
          <article 
            key={work.slug?.current || `work-${index}`} 
            className={`flex flex-col gap-4 min-w-[380px] group ${isLoading ? 'animate-pulse' : ''}`}
          >
            <a href={isLoading ? '#' : `/work/${work.slug?.current || ''}`} className="block">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
                {work.thumbnail && !isLoading ? (
                  <img 
                    src={urlForImage(work.thumbnail)?.url()} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700" />
                )}
              </div>
              
              <div className="text-white mt-4">
                <h3 className="text-xl font-medium mb-2">
                  {isLoading ? (
                    <div className="h-6 w-3/4 bg-gray-700 rounded" />
                  ) : (
                    work.title
                  )}
                </h3>
                {(work.categories || isLoading) && (
                  <div className="opacity-60">
                    {isLoading ? (
                      <div className="h-4 w-1/2 bg-gray-700 rounded" />
                    ) : (
                      work.categories?.map(cat => cat.title).join(' • ')
                    )}
                  </div>
                )}
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}