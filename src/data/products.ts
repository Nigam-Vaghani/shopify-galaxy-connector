
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  // Electronics
  {
    id: "e1",
    name: "Ultra HD Smart TV",
    description: "55-inch Ultra HD Smart TV with built-in streaming apps and voice control.",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHZ8ZW58MHx8MHx8fDA%3D",
    category: "electronics",
    rating: 4.7,
    stock: 15,
    featured: true
  },
  {
    id: "e2",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    rating: 4.8,
    stock: 25
  },
  {
    id: "e3",
    name: "Professional DSLR Camera",
    description: "24.1 Megapixel DSLR Camera with 18-55mm lens, perfect for professional photography.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    rating: 4.6,
    stock: 10
  },
  {
    id: "e4",
    name: "High-Performance Gaming Laptop",
    description: "15.6-inch gaming laptop with RTX graphics, 16GB RAM, and 1TB SSD storage.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwbGFwdG9wfGVufDB8fDB8fHww",
    category: "electronics",
    rating: 4.5,
    stock: 8,
    featured: true
  },
  {
    id: "e5",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1603539279542-e5205f2e780f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    rating: 4.4,
    stock: 30
  },
  {
    id: "e6",
    name: "Smart Home Security System",
    description: "Complete home security system with cameras, sensors, and mobile app integration.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D",
    category: "electronics",
    rating: 4.3,
    stock: 12
  },
  {
    id: "e7",
    name: "4K Action Camera",
    description: "Waterproof 4K action camera with image stabilization and slow-motion recording.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWN0aW9uJTIwY2FtZXJhfGVufDB8fDB8fHww",
    category: "electronics",
    rating: 4.5,
    stock: 20
  },
  {
    id: "e8",
    name: "Bluetooth Portable Speaker",
    description: "Waterproof Bluetooth speaker with 24-hour battery life and deep bass.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    rating: 4.2,
    stock: 25
  },
  {
    id: "e9",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone notifications.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    category: "electronics",
    rating: 4.6,
    stock: 18,
    featured: true
  },
  {
    id: "e10",
    name: "Drone with HD Camera",
    description: "Foldable drone with 4K camera, 30-minute flight time, and intelligent flight modes.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJvbmV8ZW58MHx8MHx8fDA%3D",
    category: "electronics",
    rating: 4.7,
    stock: 7
  },

  // Clothing
  {
    id: "c1",
    name: "Men's Classic Fit Dress Shirt",
    description: "Premium cotton dress shirt with wrinkle-resistant finish, available in various colors.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3MlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    category: "clothing",
    rating: 4.5,
    stock: 35
  },
  {
    id: "c2",
    name: "Women's High-Waisted Jeans",
    description: "Comfortable stretch denim jeans with a flattering high-waisted fit.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVhbnN8ZW58MHx8MHx8fDA%3D",
    category: "clothing",
    rating: 4.7,
    stock: 40,
    featured: true
  },
  {
    id: "c3",
    name: "Unisex Casual Hoodie",
    description: "Soft cotton-blend hoodie with kangaroo pocket, perfect for layering.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9vZGllfGVufDB8fDB8fHww",
    category: "clothing",
    rating: 4.6,
    stock: 50
  },
  {
    id: "c4",
    name: "Men's Performance Running Shoes",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnRzJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
    category: "clothing",
    rating: 4.8,
    stock: 25
  },
  {
    id: "c5",
    name: "Women's Leather Ankle Boots",
    description: "Classic leather ankle boots with comfortable heel and durable construction.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vdHN8ZW58MHx8MHx8fDA%3D",
    category: "clothing",
    rating: 4.5,
    stock: 20
  },
  {
    id: "c6",
    name: "Men's Slim Fit Chino Pants",
    description: "Versatile slim-fit chino pants made from stretch cotton for all-day comfort.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFudHN8ZW58MHx8MHx8fDA%3D",
    category: "clothing",
    rating: 4.4,
    stock: 30
  },
  {
    id: "c7",
    name: "Women's Summer Maxi Dress",
    description: "Flowing maxi dress in lightweight fabric with floral pattern, perfect for summer.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1623609163841-5e69d8c62cc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWF4aSUyMGRyZXNzfGVufDB8fDB8fHww",
    category: "clothing",
    rating: 4.7,
    stock: 22,
    featured: true
  },
  {
    id: "c8",
    name: "Unisex Waterproof Rain Jacket",
    description: "Lightweight, packable rain jacket with hood and sealed seams.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFja2V0fGVufDB8fDB8fHww",
    category: "clothing",
    rating: 4.6,
    stock: 18
  },
  {
    id: "c9",
    name: "Men's Cotton T-Shirt Pack",
    description: "Pack of 5 premium cotton t-shirts in assorted colors.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHNoaXJ0fGVufDB8fDB8fHww",
    category: "clothing",
    rating: 4.5,
    stock: 45
  },
  {
    id: "c10",
    name: "Women's Athletic Leggings",
    description: "High-waisted athletic leggings with moisture-wicking fabric and hidden pocket.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556137832-b10bcc9741de?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVnZ2luZ3N8ZW58MHx8MHx8fDA%3D",
    category: "clothing",
    rating: 4.8,
    stock: 38
  },

  // Home & Kitchen
  {
    id: "h1",
    name: "Professional Chef's Knife",
    description: "8-inch high-carbon stainless steel chef's knife with ergonomic handle.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZWYlMjBrbmlmZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "home",
    rating: 4.7,
    stock: 20
  },
  {
    id: "h2",
    name: "Non-Stick Cookware Set",
    description: "10-piece non-stick cookware set including pots, pans, and utensils.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1584045723894-e910d3d1ae13?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va3dhcmV8ZW58MHx8MHx8fDA%3D",
    category: "home",
    rating: 4.6,
    stock: 15,
    featured: true
  },
  {
    id: "h3",
    name: "Plush Microfiber Bedding Set",
    description: "Queen-size bedding set with duvet cover, fitted sheet, and pillowcases.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    category: "home",
    rating: 4.8,
    stock: 22
  },
  {
    id: "h4",
    name: "Programmable Coffee Maker",
    description: "12-cup programmable coffee maker with built-in grinder and thermal carafe.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D",
    category: "home",
    rating: 4.5,
    stock: 18
  },
  {
    id: "h5",
    name: "Smart LED Floor Lamp",
    description: "WiFi-enabled floor lamp with color changing capability and voice control.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtcHxlbnwwfHwwfHx8MA%3D%3D",
    category: "home",
    rating: 4.3,
    stock: 14
  },
  {
    id: "h6",
    name: "Luxury Bath Towel Set",
    description: "Set of 6 premium cotton bath towels, hand towels, and washcloths.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG93ZWxzfGVufDB8fDB8fHww",
    category: "home",
    rating: 4.7,
    stock: 35
  },
  {
    id: "h7",
    name: "Robotic Vacuum Cleaner",
    description: "Smart robot vacuum with mapping technology, app control, and automatic charging.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3QlMjB2YWN1dW18ZW58MHx8MHx8fDA%3D",
    category: "home",
    rating: 4.6,
    stock: 12,
    featured: true
  },
  {
    id: "h8",
    name: "Modern End Table",
    description: "Sleek side table with storage drawer, perfect for living room or bedroom.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1551298698-66b830a4f11c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW5kJTIwdGFibGV8ZW58MHx8MHx8fDA%3D",
    category: "home",
    rating: 4.4,
    stock: 8
  },
  {
    id: "h9",
    name: "Air Purifier with HEPA Filter",
    description: "Air purifier that removes 99.97% of airborne particles with quiet operation.",
    price: 169.99,
    image: "https://images.unsplash.com/photo-1585401586477-ddbaed355d0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwcHVyaWZpZXJ8ZW58MHx8MHx8fDA%3D",
    category: "home",
    rating: 4.5,
    stock: 16
  },
  {
    id: "h10",
    name: "Decorative Throw Pillow Set",
    description: "Set of 4 decorative throw pillows in complementary patterns and colors.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlsbG93c3xlbnwwfHwwfHx8MA%3D%3D",
    category: "home",
    rating: 4.3,
    stock: 28
  },

  // Beauty & Personal Care
  {
    id: "b1",
    name: "Premium Skincare Set",
    description: "Complete skincare set with cleanser, toner, serum, and moisturizer.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D",
    category: "beauty",
    rating: 4.8,
    stock: 25,
    featured: true
  },
  {
    id: "b2",
    name: "Professional Hair Dryer",
    description: "Salon-quality hair dryer with multiple heat settings and ionic technology.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMGRyeWVyfGVufDB8fDB8fHww",
    category: "beauty",
    rating: 4.6,
    stock: 18
  },
  {
    id: "b3",
    name: "Luxury Perfume",
    description: "Elegant fragrance with notes of jasmine, vanilla, and sandalwood.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "beauty",
    rating: 4.7,
    stock: 22
  },
  {
    id: "b4",
    name: "Electric Toothbrush",
    description: "Rechargeable sonic toothbrush with multiple cleaning modes and timer.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1559591937-edd1a583e5da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9vdGhicnVzaHxlbnwwfHwwfHx8MA%3D%3D",
    category: "beauty",
    rating: 4.5,
    stock: 30
  },
  {
    id: "b5",
    name: "Makeup Brush Set",
    description: "Professional 15-piece makeup brush set with synthetic bristles and storage case.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFrZXVwJTIwYnJ1c2h8ZW58MHx8MHx8fDA%3D",
    category: "beauty",
    rating: 4.6,
    stock: 35
  },
  {
    id: "b6",
    name: "Natural Bath Bomb Set",
    description: "Set of 6 handcrafted bath bombs with essential oils and dried flowers.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1558959448-d7973f3e3aaf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmF0aCUyMGJvbWJ8ZW58MHx8MHx8fDA%3D",
    category: "beauty",
    rating: 4.4,
    stock: 40
  },
  {
    id: "b7",
    name: "Eyeshadow Palette",
    description: "Professional eyeshadow palette with 24 highly pigmented matte and shimmer shades.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXllc2hhZG93fGVufDB8fDB8fHww",
    category: "beauty",
    rating: 4.7,
    stock: 25,
    featured: true
  },
  {
    id: "b8",
    name: "Men's Grooming Kit",
    description: "Complete grooming kit with beard trimmer, razor, and skincare products.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1621607512052-59e42f9b251e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3Jvb21pbmd8ZW58MHx8MHx8fDA%3D",
    category: "beauty",
    rating: 4.5,
    stock: 20
  },
  {
    id: "b9",
    name: "Facial Cleansing Brush",
    description: "Waterproof silicone facial cleansing brush with sonic vibration technology.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1626339867228-7830b343cf7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2lhbCUyMGNsZWFuc2VyfGVufDB8fDB8fHww",
    category: "beauty",
    rating: 4.3,
    stock: 15
  },
  {
    id: "b10",
    name: "Hair Styling Tools Set",
    description: "Set with straightener, curling iron, and styling products for all hair types.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1572457091633-672a0a318b23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFpciUyMHN0cmFpZ2h0ZW5lcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "beauty",
    rating: 4.6,
    stock: 12
  },

  // Sports & Outdoors
  {
    id: "s1",
    name: "Yoga Mat with Carrying Strap",
    description: "Non-slip yoga mat with alignment markings and convenient carrying strap.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "sports",
    rating: 4.6,
    stock: 40
  },
  {
    id: "s2",
    name: "Mountain Bike",
    description: "All-terrain mountain bike with 21 speeds, disc brakes, and front suspension.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "sports",
    rating: 4.8,
    stock: 10,
    featured: true
  },
  {
    id: "s3",
    name: "Tennis Racket",
    description: "Professional tennis racket with optimal control and power for all skill levels.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1617734976396-908b5b6fe15e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVubmlzJTIwcmFja2V0fGVufDB8fDB8fHww",
    category: "sports",
    rating: 4.5,
    stock: 15
  },
  {
    id: "s4",
    name: "Hiking Backpack",
    description: "Waterproof 50L hiking backpack with multiple compartments and hydration system compatibility.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553731944-64ffd4765cd9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGlraW5nJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    category: "sports",
    rating: 4.7,
    stock: 22
  },
  {
    id: "s5",
    name: "Basketball",
    description: "Official size and weight basketball with superior grip and durability.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1518641353966-e7f08c91b4da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
    category: "sports",
    rating: 4.4,
    stock: 30
  },
  {
    id: "s6",
    name: "Camping Tent",
    description: "4-person waterproof tent with easy setup and mesh windows for ventilation.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVudHxlbnwwfHwwfHx8MA%3D%3D",
    category: "sports",
    rating: 4.6,
    stock: 18,
    featured: true
  },
  {
    id: "s7",
    name: "Fitness Tracker Smartwatch",
    description: "Waterproof fitness tracker with heart rate monitor, sleep tracking, and workout modes.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd398?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D",
    category: "sports",
    rating: 4.5,
    stock: 25
  },
  {
    id: "s8",
    name: "Adjustable Dumbbell Set",
    description: "Space-saving adjustable dumbbell set with weights ranging from 5-52.5 lbs.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVtYmJlbGx8ZW58MHx8MHx8fDA%3D",
    category: "sports",
    rating: 4.8,
    stock: 12
  },
  {
    id: "s9",
    name: "Insulated Water Bottle",
    description: "32oz vacuum-insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
    category: "sports",
    rating: 4.6,
    stock: 45
  },
  {
    id: "s10",
    name: "Golf Club Set",
    description: "Complete set of golf clubs with driver, woods, irons, putter, and carrying bag.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1593111774240-d449cc2b766c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZiUyMGNsdWJ8ZW58MHx8MHx8fDA%3D",
    category: "sports",
    rating: 4.7,
    stock: 8
  }
];
