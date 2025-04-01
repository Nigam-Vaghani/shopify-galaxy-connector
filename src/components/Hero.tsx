
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products for Every Need</h1>
            <p className="text-lg mb-8 text-blue-100">Shop our curated collection of high-quality products at competitive prices, with fast shipping and excellent customer service.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categories">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D" 
              alt="Shopping showcase" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
