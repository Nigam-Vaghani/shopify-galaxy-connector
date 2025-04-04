
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

// ProductCard component - displays a single product with image, details, and add to cart functionality
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  // State to track if the image has failed to load
  const [imageError, setImageError] = useState(false);

  // Handle add to cart button click
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Fallback image handler if product image fails to load
  const handleImageError = () => {
    console.log(`Image failed to load for: ${product.name}`);
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        {/* Product image section */}
        <div className="h-56 overflow-hidden">
          <img 
            src={imageError ? '/placeholder.svg' : product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
        </div>
      </Link>
      
      <div className="p-4">
        {/* Product name section */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>
        
        {/* Product rating section */}
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{product.rating.toFixed(1)}</span>
        </div>
        
        {/* Product price section */}
        <p className="text-xl font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
        
        {/* Product availability and add to cart section */}
        <div className="flex justify-between items-center">
          <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-600'}`}>
            {product.stock > 10 
              ? 'In Stock' 
              : product.stock > 0 
                ? `Only ${product.stock} left` 
                : 'Out of Stock'
            }
          </span>
          <Button size="sm" onClick={handleAddToCart} disabled={product.stock === 0}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
