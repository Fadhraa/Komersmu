'use client';

import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

export function CartSheet() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const itemCount = totalItems();
  const total = totalPrice();

  return (
    <Sheet>
      <SheetTrigger 
        render={
          <Button variant="outline" size="icon" className="relative" />
        }
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#ffdb00] text-[#111111] text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center border border-black/10">
            {itemCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-2 border-b">
                    <div className="relative h-16 w-16 rounded overflow-hidden bg-white">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                      <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="pt-4 border-t mt-auto">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full rounded-full border-[#dfdfdf] font-bold text-xs sm:text-sm cursor-pointer" onClick={clearCart}>
                  Kosongkan
                </Button>
                <button className="w-full h-10 px-4 rounded-full text-xs sm:text-sm font-bold bg-[#0058a3] hover:bg-[#004f93] text-white transition-colors cursor-pointer">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
