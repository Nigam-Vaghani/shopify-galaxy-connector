
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryList from '@/components/CategoryList';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <CategoryList />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
