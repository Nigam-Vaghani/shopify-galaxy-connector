
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Share2, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    // Product not found, redirect to home or show error
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const category = categories.find(c => c.id === product.category);
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm">
              <ol className="list-none p-0 flex flex-wrap">
                <li className="flex items-center">
                  <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                  <span className="mx-2 text-gray-400">/</span>
                </li>
                <li className="flex items-center">
                  <a href="/categories" className="text-gray-600 hover:text-gray-900">Categories</a>
                  <span className="mx-2 text-gray-400">/</span>
                </li>
                {category && (
                  <li className="flex items-center">
                    <a href={`/categories/${category.id}`} className="text-gray-600 hover:text-gray-900">{category.name}</a>
                    <span className="mx-2 text-gray-400">/</span>
                  </li>
                )}
                <li className="text-gray-900 font-medium truncate">{product.name}</li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Product Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`fill-current ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        size={20}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">{product.rating.toFixed(1)} ({Math.round(product.rating * 12)} reviews)</span>
                </div>
                
                {/* Price */}
                <div className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
                
                {/* Description */}
                <p className="text-gray-600 mb-8">{product.description}</p>
                
                {/* Stock Status */}
                <div className="mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 10 
                      ? 'In Stock' 
                      : product.stock > 0 
                        ? `Only ${product.stock} left` 
                        : 'Out of Stock'
                    }
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button 
                    size="lg" 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Features */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Truck className="w-5 h-5 mr-3 text-blue-600" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <RotateCcw className="w-5 h-5 mr-3 text-blue-600" />
                    <span>30-day easy returns</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Shield className="w-5 h-5 mr-3 text-blue-600" />
                    <span>2-year warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

// Importing ProductCard component for use within this file
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
      <a href={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </a>
      
      <div className="p-4">
        <a href={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors truncate">{product.name}</h3>
        </a>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current text-yellow-400" : "fill-current text-gray-300"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">{product.rating.toFixed(1)}</span>
        </div>
        
        <p className="text-lg font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
        
        <Button size="sm" className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductDetail;
