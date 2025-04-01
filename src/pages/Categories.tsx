
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories } from '@/data/categories';

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Shop by Category</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our wide range of products organized by category to find exactly what you're looking for.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-xl"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{category.name}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="text-blue-600 font-medium">
                      Browse Products
                      <span className="ml-2 group-hover:ml-3 transition-all duration-200">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
