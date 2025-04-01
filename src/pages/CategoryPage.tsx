
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  const category = categories.find(cat => cat.id === categoryId);
  
  // Filter products based on category, search term, price range, and rating
  useEffect(() => {
    let result = products;
    
    // Filter by category if categoryId is provided
    if (categoryId) {
      result = result.filter(product => product.category === categoryId);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by minimum rating
    if (minRating > 0) {
      result = result.filter(product => product.rating >= minRating);
    }
    
    setFilteredProducts(result);
  }, [categoryId, searchTerm, priceRange, minRating]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setMinRating(0);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Category Header */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {category ? category.name : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {category ? category.description : 'Browse our full selection of products'}
            </p>
          </div>
        </section>
        
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Search</h3>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                    <Slider
                      defaultValue={[0, 1000]}
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value)}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Rating</h3>
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center mb-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={minRating === rating}
                          onCheckedChange={() => setMinRating(rating === minRating ? 0 : rating)}
                        />
                        <Label htmlFor={`rating-${rating}`} className="ml-2 cursor-pointer">
                          {rating}+ Stars
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
              
              {/* Mobile Filters Toggle */}
              <div className="lg:hidden mb-4">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full flex items-center justify-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
              
              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Filters</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Search</h3>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                      <Slider
                        defaultValue={[0, 1000]}
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value)}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Rating</h3>
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center mb-2">
                          <Checkbox
                            id={`mobile-rating-${rating}`}
                            checked={minRating === rating}
                            onCheckedChange={() => setMinRating(rating === minRating ? 0 : rating)}
                          />
                          <Label htmlFor={`mobile-rating-${rating}`} className="ml-2 cursor-pointer">
                            {rating}+ Stars
                          </Label>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Product Grid */}
              <div className="flex-grow">
                {/* Results info */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                
                {/* Product listing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
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
        
        <div className="flex justify-between items-center">
          <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-600'}`}>
            {product.stock > 10 
              ? 'In Stock' 
              : product.stock > 0 
                ? `Only ${product.stock} left` 
                : 'Out of Stock'
            }
          </span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
