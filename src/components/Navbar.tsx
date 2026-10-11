import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { CartSheet } from './CartSheet';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dfdfdf] bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight select-none">
            <span className="text-[#0058a3]">Komers</span>
            <span className="text-[#eab308]">Mu</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
