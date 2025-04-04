
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getInventory, removeItem, updateItemQuantity, ProductWithQuantity, addNewProduct } from '@/lib/localUserStorage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Trash, 
  Loader2, 
  PackagePlus,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '10',
    image: '/placeholder.svg' // Default image
  });
  
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
      loadInventory(); // Reload inventory to reflect changes
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
        // Update local state directly instead of reloading the entire inventory
        setInventory(inventory.filter(item => item.id !== id));
      } else {
        toast({
          title: "Error",
          description: "Failed to remove item",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewProductChange = (field: string, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProduct = () => {
    // Validate input
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(newProduct.price);
    const quantity = parseInt(newProduct.quantity);
    
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(quantity) || quantity < 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    try {
      // Add new product to inventory
      const success = addNewProduct({
        name: newProduct.name,
        description: newProduct.description,
        price,
        category: newProduct.category,
        image: newProduct.image,
        quantity
      });

      if (success) {
        toast({
          title: "Success",
          description: "Product added to inventory",
        });
        setIsAddProductOpen(false);
        
        // Reset form
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          quantity: '10',
          image: '/placeholder.svg'
        });
        
        // Load the updated inventory
        loadInventory();
      } else {
        toast({
          title: "Error",
          description: "Failed to add product",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
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
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsAddProductOpen(true)}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <PackagePlus size={16} className="mr-1" />
                  Add New Product
                </Button>
                <Button 
                  onClick={loadInventory}
                  variant="outline"
                  className="border-yellow-300 text-yellow-700"
                >
                  <RefreshCw size={16} className="mr-1" />
                  Refresh Inventory
                </Button>
              </div>
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

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => handleNewProductChange('name', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newProduct.description}
                onChange={(e) => handleNewProductChange('description', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => handleNewProductChange('category', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raw-honey">Raw Honey</SelectItem>
                  <SelectItem value="creamed-honey">Creamed Honey</SelectItem>
                  <SelectItem value="honeycomb">Honeycomb</SelectItem>
                  <SelectItem value="bee-products">Bee Products</SelectItem>
                  <SelectItem value="gifts">Gifts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                min="0.01"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => handleNewProductChange('price', e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={newProduct.quantity}
                onChange={(e) => handleNewProductChange('quantity', e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
