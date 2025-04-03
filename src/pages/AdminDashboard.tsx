import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash, Plus, ImagePlus, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category_id: z.string().min(1, 'Please select a category'),
  image_url: z.string().optional(),
  featured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      category_id: '',
      image_url: '',
      featured: false,
    },
  });

  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(id, name)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching categories",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    
    try {
      setIsUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      let imageUrl = values.image_url;
      
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const productData = {
        ...values,
        price: parseFloat(values.price),
        image_url: imageUrl || null,
      };
      
      if (isEditing && currentProductId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', currentProductId);
          
        if (error) throw error;
        
        toast({
          title: "Product updated",
          description: "The product has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
          
        if (error) throw error;
        
        toast({
          title: "Product added",
          description: "The product has been added successfully.",
        });
      }
      
      form.reset();
      setIsEditing(false);
      setCurrentProductId(null);
      setImageFile(null);
      
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error saving product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: any) => {
    setIsEditing(true);
    setCurrentProductId(product.id);
    
    form.setValue('name', product.name);
    form.setValue('price', product.price.toString());
    form.setValue('description', product.description);
    form.setValue('category_id', product.category_id);
    form.setValue('image_url', product.image_url || '');
    form.setValue('featured', product.featured || false);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Product deleted",
          description: "The product has been deleted successfully.",
        });
        
        fetchProducts();
      } catch (error: any) {
        toast({
          title: "Error deleting product",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
    setCurrentProductId(null);
    setImageFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow p-6 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-700">Admin Dashboard</h1>
            <Link to="/admin/users">
              <Button className="bg-yellow-500 hover:bg-yellow-600 flex items-center gap-2">
                <Users size={18} />
                Manage Users
              </Button>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-yellow-200">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter product name" 
                            {...field} 
                            className="border-yellow-300 focus-visible:ring-yellow-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="0.00" 
                            {...field} 
                            className="border-yellow-300 focus-visible:ring-yellow-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the product" 
                          {...field} 
                          className="border-yellow-300 focus-visible:ring-yellow-500 min-h-24"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          className="w-full rounded-md border border-yellow-300 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                          {...field}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="rounded border-yellow-300 text-yellow-500 focus:ring-yellow-500"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Product</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Image URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Image URL (optional)" 
                          {...field} 
                          className="border-yellow-300 focus-visible:ring-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload New Image</label>
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-md border border-yellow-300 flex items-center">
                      <ImagePlus size={18} className="mr-2" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {imageFile && (
                      <span className="text-sm text-gray-600">
                        {imageFile.name}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    type="submit" 
                    className="bg-yellow-500 hover:bg-yellow-600"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : isEditing ? 'Update Product' : 'Add Product'}
                  </Button>
                  
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCancel}
                      className="border-yellow-300 text-yellow-700"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
            <h2 className="text-xl font-semibold text-yellow-600 mb-6">Product List</h2>
            
            {isLoadingProducts ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No products found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.categories?.name}</TableCell>
                        <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEdit(product)}
                              className="border-yellow-300 text-yellow-700"
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDelete(product.id)}
                              className="border-red-300 text-red-700 hover:bg-red-50"
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
