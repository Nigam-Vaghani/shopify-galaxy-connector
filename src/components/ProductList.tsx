import React, { useEffect, useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { getInventory, ProductWithQuantity } from '@/lib/localUserStorage';

/**
 * ProductList Component
 * 
 * A versatile component that displays a grid of products.
 * It can either use provided products or fetch from local storage.
 * Used throughout the app for showing products on various pages.
 */
interface ProductListProps {
  products?: Product[];   // Optional array of products to display
  title?: string;         // Optional title for the product section
  description?: string;   // Optional description for the product section
}

const ProductList: React.FC<ProductListProps> = ({ 
  products: initialProducts, 
  title = "All Products", 
  description = "Browse our collection of high-quality products"
}) => {
  // State to hold the products to display
  const [products, setProducts] = useState<ProductWithQuantity[]>([]);

  // Load products either from props or from local storage
  useEffect(() => {
    if (initialProducts) {
      // If products were provided as props, use those
      setProducts(initialProducts as ProductWithQuantity[]);
    } else {
      // Otherwise fetch from local storage
      const inventoryProducts = getInventory();
      setProducts(inventoryProducts);
    }
  }, [initialProducts]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - only shown if title or description exists */}
        {(title || description) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>}
            {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
          </div>
        )}
        
        {/* Product grid or empty state */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
