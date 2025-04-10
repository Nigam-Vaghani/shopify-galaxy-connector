
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getInventory, ProductWithQuantity } from '@/lib/localUserStorage';

/**
 * FeaturedProducts Component
 * 
 * Displays a section on the homepage showing featured products that have been marked as featured
 * by the admin in the inventory management. Shows up to 4 featured products at a time.
 */
const FeaturedProducts = () => {
  // State to hold featured products
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithQuantity[]>([]);
  
  // Load featured products from inventory when component mounts
  useEffect(() => {
    const inventory = getInventory();
    const featured = inventory.filter(product => product.featured).slice(0, 4);
    setFeaturedProducts(featured);
  }, []);
  
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover our handpicked selection of premium products that stand out for their quality and value.</p>
        </div>
        
        {/* Grid of featured products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
