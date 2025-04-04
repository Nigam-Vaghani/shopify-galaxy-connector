import React, { useEffect, useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { getInventory, ProductWithQuantity } from '@/lib/localUserStorage';

interface ProductListProps {
  products?: Product[];
  title?: string;
  description?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products: initialProducts, 
  title = "All Products", 
  description = "Browse our collection of high-quality products"
}) => {
  const [products, setProducts] = useState<ProductWithQuantity[]>([]);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts as ProductWithQuantity[]);
    } else {
      const inventoryProducts = getInventory();
      setProducts(inventoryProducts);
    }
  }, [initialProducts]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>}
            {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
          </div>
        )}
        
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
