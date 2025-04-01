
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "The latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Stylish and comfortable clothing for all occasions",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsb3RoaW5nfGVufDB8fDB8fHww"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    description: "Everything you need for your home and kitchen",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    description: "Premium beauty and personal care products",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXV0eXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    description: "Equipment and gear for all your outdoor activities",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D"
  }
];
