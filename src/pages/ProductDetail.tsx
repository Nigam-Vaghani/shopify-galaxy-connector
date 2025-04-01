import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Share2, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
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
  
  const category = categories.find(c => c.id === product?.category);
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product?.name} has been added to your wishlist.`,
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

export default ProductDetail;
