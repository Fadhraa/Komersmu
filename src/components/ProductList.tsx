'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface ProductListProps {
  initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(initialProducts.map((p) => p.category)))];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar & Filters */}
      <div className="max-w-xl mx-auto space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-4 h-4 text-[#767676]" />
          </div>
          <Input
            type="text"
            className="pl-11 pr-10 h-11 text-sm rounded-full bg-[#f5f5f5] hover:bg-[#ececec] focus:bg-white border-[#dfdfdf] focus-visible:border-[#0058a3] focus-visible:ring-0 text-[#111111] placeholder:text-[#767676]"
            placeholder="Cari produk atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#767676] hover:text-[#111111]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none no-scrollbar justify-start sm:justify-center">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0058a3] text-white'
                      : 'bg-[#f5f5f5] text-[#111111] hover:bg-[#e5e5e5] border border-[#dfdfdf]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Grid / Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#f5f5f5] rounded-md border border-[#dfdfdf] text-[#484848] max-w-lg mx-auto">
          <Search className="h-10 w-10 mx-auto text-[#767676] mb-3" />
          <p className="text-base font-bold text-[#111111]">
            Produk tidak ditemukan
          </p>
          <p className="text-xs text-[#767676] mt-1">
            Coba gunakan kata kunci pencarian atau kategori lain.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="inline-flex items-center gap-1.5 mt-4 px-5 py-2 rounded-full text-xs font-bold bg-[#0058a3] hover:bg-[#004f93] text-white transition-colors cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

