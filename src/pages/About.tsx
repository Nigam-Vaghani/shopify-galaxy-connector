
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Users, MapPin, Heart, TrendingUp, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About ShopConnect</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're on a mission to connect you with high-quality products at affordable prices, all while providing exceptional customer service and a seamless shopping experience.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2015, ShopConnect began with a simple idea: to create a shopping platform that truly puts customers first. Our founders, having experienced the frustrations of online shopping firsthand, wanted to build something better.
                </p>
                <p className="text-gray-600 mb-4">
                  What started as a small operation with just a handful of products has grown into a comprehensive marketplace offering thousands of items across multiple categories.
                </p>
                <p className="text-gray-600">
                  Despite our growth, we remain committed to our core values of quality, affordability, and exceptional customer service. Every product on our platform is carefully vetted to ensure it meets our high standards.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhbXxlbnwwfHwwfHx8MA%3D%3D" 
                  alt="Team meeting" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                At ShopConnect, everything we do is guided by these core principles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 mb-4">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on quality. Every product on our platform undergoes a rigorous selection process.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 mb-4">
                  <Heart size={36} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Obsession</h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority. We're committed to providing exceptional customer service at every step.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 mb-4">
                  <TrendingUp size={36} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Continuous Improvement</h3>
                <p className="text-gray-600">
                  We're always looking for ways to improve our platform, our products, and your shopping experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We're a diverse group of passionate individuals working together to build the best shopping experience for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden inline-block">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" 
                    alt="CEO" 
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Robert Johnson</h3>
                <p className="text-blue-600 mb-2">CEO & Founder</p>
                <p className="text-gray-600 text-sm">Visionary entrepreneur with 15+ years of e-commerce experience</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden inline-block">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" 
                    alt="COO" 
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah Miller</h3>
                <p className="text-blue-600 mb-2">Chief Operations Officer</p>
                <p className="text-gray-600 text-sm">Operational expert focused on creating efficient processes</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden inline-block">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" 
                    alt="CTO" 
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">David Chen</h3>
                <p className="text-blue-600 mb-2">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">Tech guru building innovative shopping solutions</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden inline-block">
                  <img 
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" 
                    alt="CMO" 
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Lisa Thompson</h3>
                <p className="text-blue-600 mb-2">Chief Marketing Officer</p>
                <p className="text-gray-600 text-sm">Creative marketer with a passion for brand storytelling</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="mb-4">
                  <Zap size={48} className="inline-block" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Fast Shipping</h3>
                <p className="text-blue-100">
                  We partner with top logistics providers to ensure your orders arrive quickly and safely.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4">
                  <Users size={48} className="inline-block" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-blue-100">
                  Our customer service team is available around the clock to assist with any questions or concerns.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4">
                  <MapPin size={48} className="inline-block" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Global Reach</h3>
                <p className="text-blue-100">
                  We ship to over 100 countries, bringing quality products to customers worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
