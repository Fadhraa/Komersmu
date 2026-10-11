import { Product } from '@/types/product';
import { ProductList } from '@/components/ProductList';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=30', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      console.error('Failed to fetch products');
      return [];
    }
    
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#111111]">
          Katalog Produk KomersMu
        </h1>
        <p className="text-sm sm:text-base text-[#484848] max-w-md mx-auto">
          Pilihan produk fungsional dan terjangkau untuk kebutuhan sehari-hari.
        </p>
      </div>
      
      <ProductList initialProducts={products} />
    </div>
  );
}
