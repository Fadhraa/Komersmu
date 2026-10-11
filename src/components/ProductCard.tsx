'use client';

import { Product } from '@/types/product';
import { ShoppingCart, Star, Check } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 900);
  };

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage! / 100)).toFixed(2)
    : null;

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-md border border-[#dfdfdf] hover:border-[#0058a3] transition-colors duration-200 overflow-hidden">
      {/* Product Image */}
      <div className="relative pt-[90%] bg-[#f5f5f5] overflow-hidden">
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        </div>

        {/* Badges - IKEA style: solid yellow sale tag */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none">
          {hasDiscount ? (
            <span className="bg-[#ffdb00] text-[#111111] text-[11px] font-black px-2 py-0.5 rounded-xs tracking-tight">
              HEMAT {Math.round(product.discountPercentage!)}%
            </span>
          ) : (
            <span />
          )}

          <span className="bg-white text-[#484848] text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-xs border border-[#dfdfdf]">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-3 bg-white">
        <div className="space-y-1">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[11px] font-bold text-[#0058a3] uppercase tracking-wider line-clamp-1">
              {product.brand || product.category}
            </span>

            <div className="flex items-center gap-1 text-[#111111] font-medium text-xs shrink-0">
              <Star className="h-3 w-3 fill-[#ffdb00] text-[#ffdb00]" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-sm text-[#111111] leading-snug line-clamp-2 group-hover:text-[#0058a3] transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#f0f0f0] flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[11px] text-[#767676] line-through leading-none">
                ${originalPrice}
              </span>
            )}
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-xs font-bold text-[#111111]">$</span>
              <span className="text-lg font-black text-[#111111] tracking-tight leading-none">
                {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold transition-colors cursor-pointer disabled:cursor-default ${
              isAdding
                ? 'bg-[#ffdb00] text-[#111111]'
                : 'bg-[#0058a3] hover:bg-[#004f93] text-white'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
                <span>Ditambah</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Beli</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


