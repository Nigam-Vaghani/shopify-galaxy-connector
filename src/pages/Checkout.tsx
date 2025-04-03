import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  CreditCard, 
  Home, 
  QrCode, 
  CheckCircle,
  ArrowLeft,
  Loader2
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  paymentMethod: z.enum(["cod", "card", "upi"], {
    required_error: "Please select a payment method",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showUpiDialog, setShowUpiDialog] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to complete your purchase.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, toast]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      paymentMethod: "cod",
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some items to your cart before checking out.</p>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="mb-6">Thank you for your order. We'll send you a confirmation email shortly.</p>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  function onSubmit(data: FormValues) {
    if (data.paymentMethod === "upi") {
      setShowUpiDialog(true);
    } else if (data.paymentMethod === "card") {
      toast({
        title: "Payment successful",
        description: "Your card payment has been processed successfully.",
      });
      completeOrder();
    } else {
      toast({
        title: "Order placed",
        description: "Your order has been placed successfully. You'll pay upon delivery.",
      });
      completeOrder();
    }
  }

  function completeOrder() {
    clearCart();
    setOrderComplete(true);
  }

  function handleUpiPaymentConfirm() {
    setShowUpiDialog(false);
    toast({
      title: "UPI payment confirmed",
      description: "Your UPI payment has been confirmed. Your order is now being processed.",
    });
    completeOrder();
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md">
                            <FormControl>
                              <RadioGroupItem value="cod" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center">
                              <Home className="mr-2 h-5 w-5" />
                              Cash on Delivery
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center">
                              <CreditCard className="mr-2 h-5 w-5" />
                              Credit/Debit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md">
                            <FormControl>
                              <RadioGroupItem value="upi" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center">
                              <QrCode className="mr-2 h-5 w-5" />
                              UPI Payment
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Place Order
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-3 border-t">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showUpiDialog} onOpenChange={setShowUpiDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code to Pay</DialogTitle>
            <DialogDescription>
              Scan the QR code below with your UPI app to complete the payment.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="w-64 h-64 bg-white border p-2 rounded-md">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                alt="UPI QR Code"
                className="w-full h-full"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setShowUpiDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={handleUpiPaymentConfirm}
            >
              I've Completed Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
