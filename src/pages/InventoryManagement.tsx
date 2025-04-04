
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
  RefreshCw,
  Image as ImageIcon
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

// Placeholder images that can be used if user doesn't provide an image URL
const placeholderImages = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  // State to manage image selection dialog
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '10',
    image: '/placeholder.svg', // Default image
    featured: false // Added featured flag
  });
  
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Load inventory on component mount
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    loadInventory();
  }, [isAdmin, navigate]);

  // Load inventory data from local storage
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

  // Handle quantity input change
  const handleQuantityChange = (id: string, value: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Update product quantity in local storage
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

  // Remove product from inventory
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

  // Handle new product form input changes
  const handleNewProductChange = (field: string, value: string | boolean) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Toggle featured status for a product
  const toggleFeaturedStatus = (id: string, currentStatus: boolean) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === id) {
        return { ...item, featured: !currentStatus };
      }
      return item;
    });
    
    // Update local storage
    localStorage.setItem('honey_shop_inventory', JSON.stringify(updatedInventory));
    
    // Update state
    setInventory(updatedInventory);
    
    toast({
      title: "Success",
      description: `Product ${currentStatus ? 'removed from' : 'added to'} featured products`,
    });
  };

  // Open image selection dialog
  const openImageSelector = () => {
    setIsImageDialogOpen(true);
  };

  // Select image from placeholders
  const selectImage = (imageUrl: string) => {
    handleNewProductChange('image', imageUrl);
    setIsImageDialogOpen(false);
  };
  
  // Add new product to inventory
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

    // Ensure we have an image URL
    if (!newProduct.image || newProduct.image === '/placeholder.svg') {
      // Choose a random placeholder if no image was selected
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      handleNewProductChange('image', randomImage);
    }

    try {
      // Add new product to inventory
      const success = addNewProduct({
        name: newProduct.name,
        description: newProduct.description,
        price,
        category: newProduct.category,
        image: newProduct.image,
        quantity,
        featured: newProduct.featured
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
          image: '/placeholder.svg',
          featured: false
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

  // Loading state
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
          
          {/* Inventory table section */}
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
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No items in inventory
                      </TableCell>
                    </TableRow>
                  ) : (
                    inventory.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img 
                            src={item.image || '/placeholder.svg'} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </TableCell>
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
                        <TableCell>
                          <Button
                            size="sm"
                            variant={item.featured ? "default" : "outline"}
                            onClick={() => toggleFeaturedStatus(item.id, !!item.featured)}
                            className={item.featured ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                          >
                            {item.featured ? "Featured" : "Not Featured"}
                          </Button>
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
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Kitchen</SelectItem>
                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="image"
                  value={newProduct.image}
                  onChange={(e) => handleNewProductChange('image', e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={openImageSelector}
                >
                  <ImageIcon size={16} />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Featured
              </Label>
              <div className="col-span-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={!!newProduct.featured}
                  onChange={(e) => handleNewProductChange('featured', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Set as featured product</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right col-span-1">Preview</div>
              <div className="col-span-3">
                {newProduct.image && (
                  <div className="relative w-32 h-32 border rounded overflow-hidden">
                    <img
                      src={newProduct.image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                        handleNewProductChange('image', '/placeholder.svg');
                      }}
                    />
                  </div>
                )}
              </div>
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
      
      {/* Image Selection Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Select an Image</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto py-4">
            {placeholderImages.map((image, index) => (
              <div 
                key={index}
                onClick={() => selectImage(image)}
                className="cursor-pointer border rounded-md p-1 hover:border-yellow-500 transition-colors"
              >
                <img 
                  src={image} 
                  alt={`Placeholder ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsImageDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
