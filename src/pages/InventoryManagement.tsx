
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getInventory, removeItem, updateItemQuantity, ProductWithQuantity } from '@/lib/localUserStorage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Loader2, PackageX, PackagePlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    loadInventory();
  }, [isAdmin, navigate]);

  const loadInventory = () => {
    setLoading(true);
    try {
      const items = getInventory();
      setInventory(items);
      
      // Initialize quantities state
      const initialQuantities: Record<string, string> = {};
      items.forEach(item => {
        initialQuantities[item.id] = item.quantity.toString();
      });
      setQuantities(initialQuantities);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load inventory data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id: string, value: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleUpdateQuantity = (id: string) => {
    const newQuantity = parseInt(quantities[id]);
    if (isNaN(newQuantity)) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    if (updateItemQuantity(id, newQuantity)) {
      toast({
        title: "Success",
        description: "Item quantity updated",
      });
      loadInventory();
    } else {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = (id: string) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      if (removeItem(id)) {
        toast({
          title: "Success",
          description: "Item removed from inventory",
        });
        loadInventory();
      } else {
        toast({
          title: "Error",
          description: "Failed to remove item",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-yellow-50">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
            <p className="mt-4 text-yellow-700">Loading inventory data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow p-6 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-yellow-700 mb-8">Inventory Management</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-yellow-600">Product Inventory</h2>
              <Button 
                onClick={loadInventory}
                variant="outline"
                className="border-yellow-300 text-yellow-700"
              >
                Refresh Inventory
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No items in inventory
                      </TableCell>
                    </TableRow>
                  ) : (
                    inventory.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Input 
                              type="number" 
                              value={quantities[item.id]}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="w-20"
                            />
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleUpdateQuantity(item.id)}
                              className="border-yellow-300 text-yellow-700"
                            >
                              Update
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash size={16} />
                            <span className="ml-1">Remove</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InventoryManagement;
