
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Package } from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin, user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow p-6 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-700">Admin Dashboard</h1>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-yellow-200">
            <h2 className="text-xl font-semibold text-yellow-600 mb-6">Admin Controls</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/admin/users">
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 hover:border-yellow-400 transition-colors cursor-pointer flex items-center">
                  <Users size={36} className="text-yellow-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-700">User Management</h3>
                    <p className="text-sm text-yellow-600">View and manage user accounts</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/admin/inventory">
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 hover:border-yellow-400 transition-colors cursor-pointer flex items-center">
                  <Package size={36} className="text-yellow-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-700">Inventory Management</h3>
                    <p className="text-sm text-yellow-600">Manage product inventory and stock levels</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
            <h2 className="text-xl font-semibold text-yellow-600 mb-6">Admin Information</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p><strong>Logged in as:</strong> {user?.email}</p>
                <p><strong>Admin since:</strong> {new Date(user?.createdAt || '').toLocaleDateString()}</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="font-medium">Quick Tips:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Use the User Management section to view and manage user accounts</li>
                  <li>Use the Inventory Management section to manage product stock levels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
