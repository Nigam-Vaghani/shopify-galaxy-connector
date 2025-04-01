
import React from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium products that stand out for their quality and value.</p>
        </div>
        
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
