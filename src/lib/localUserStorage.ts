
import { Product } from '@/data/products';

export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this should be hashed
  isAdmin: boolean;
  createdAt: string;
  lastSignIn: string | null;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

// This simulates a "file" that stores users and inventory
const LOCAL_USERS_KEY = 'honey_shop_users';
const LOCAL_INVENTORY_KEY = 'honey_shop_inventory';

// Initialize inventory from products data if not exists
export const initializeInventory = (products: Product[]): void => {
  if (!localStorage.getItem(LOCAL_INVENTORY_KEY)) {
    const inventory: ProductWithQuantity[] = products.map(product => ({
      ...product,
      quantity: product.stock
    }));
    localStorage.setItem(LOCAL_INVENTORY_KEY, JSON.stringify(inventory));
  }
};

// Get all users
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(LOCAL_USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Get a user by email
export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Add a new user
export const createUser = (email: string, password: string, isAdmin: boolean = false): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(user => user.email === email)) {
    throw new Error('User already exists');
  }
  
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password, // In a real app, this should be hashed
    isAdmin,
    createdAt: new Date().toISOString(),
    lastSignIn: null
  };
  
  users.push(newUser);
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  return newUser;
};

// Authenticate a user
export const authenticateUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    // Update last sign in
    user.lastSignIn = new Date().toISOString();
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    return user;
  }
  
  return null;
};

// Get inventory
export const getInventory = (): ProductWithQuantity[] => {
  const inventoryJson = localStorage.getItem(LOCAL_INVENTORY_KEY);
  return inventoryJson ? JSON.parse(inventoryJson) : [];
};

// Update item quantity
export const updateItemQuantity = (productId: string, newQuantity: number): boolean => {
  const inventory = getInventory();
  const productIndex = inventory.findIndex(item => item.id === productId);
  
  if (productIndex === -1 || newQuantity < 0) {
    return false;
  }
  
  inventory[productIndex].quantity = newQuantity;
  localStorage.setItem(LOCAL_INVENTORY_KEY, JSON.stringify(inventory));
  return true;
};

// Remove item from inventory
export const removeItem = (productId: string): boolean => {
  const inventory = getInventory();
  const updatedInventory = inventory.filter(item => item.id !== productId);
  
  if (updatedInventory.length === inventory.length) {
    return false;
  }
  
  localStorage.setItem(LOCAL_INVENTORY_KEY, JSON.stringify(updatedInventory));
  return true;
};
