import React from 'react';
import { Bot, Video, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../config/products';

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Explore by Specialization
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Filter by model focus: complex reasoning, code synthesis, generative video, or massive multimodal context.
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-1.5 rounded-full transition-colors self-start md:self-auto cursor-pointer"
            >
              Clear Filter ({selectedCategory}) ✕
            </button>
          )}
        </div>

        {/* Categories 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name || selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.name)}
                className={`group relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                    : 'bg-[#FAFAF9] hover:bg-white border-stone-200/90 hover:border-stone-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5'
                }`}
                id={`cat-card-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-white/10 text-white'
                          : 'bg-white border border-stone-200 text-stone-800 group-hover:border-stone-400'
                      }`}
                    >
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-200/80 text-stone-700'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                      isSelected ? 'text-white' : 'text-stone-900 group-hover:text-black'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className={`text-xs font-medium mt-0.5 ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {cat.tagline}
                  </p>

                  <p
                    className={`text-xs mt-3 leading-relaxed ${
                      isSelected ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                    isSelected
                      ? 'border-white/10 text-stone-200'
                      : 'border-stone-200/70 text-stone-700 group-hover:text-stone-900'
                  }`}
                >
                  <span>{isSelected ? 'Active Filter' : 'Filter Products'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
