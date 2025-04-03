
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserRound, UserX, Shield, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getUsers } from '@/lib/localUserStorage';

interface UserData {
  id: string;
  email: string;
  createdAt: string;
  lastSignIn: string | null;
  isAdmin: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin, user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    try {
      // Get users from local storage
      const localUsers = getUsers();
      
      // Map to our UserData interface
      const formattedUsers = localUsers.map(user => ({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        lastSignIn: user.lastSignIn,
        isAdmin: user.isAdmin
      }));
      
      setUsers(formattedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error fetching users",
        description: error.message || "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const toggleAdminStatus = (userId: string, currentStatus: boolean) => {
    try {
      // Get all users from local storage
      const allUsers = getUsers();
      
      // Find the user to update
      const updatedUsers = allUsers.map(user => {
        if (user.id === userId) {
          return { ...user, isAdmin: !currentStatus };
        }
        return user;
      });
      
      // Save back to local storage
      localStorage.setItem('honey_shop_users', JSON.stringify(updatedUsers));
      
      toast({
        title: currentStatus ? "Admin status removed" : "Admin status granted",
        description: currentStatus ? "User is no longer an admin" : "User is now an admin",
      });
      
      // Refresh the user list
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error updating admin status",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-yellow-50">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
            <p className="mt-4 text-yellow-700">Loading user data...</p>
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
          <h1 className="text-3xl font-bold text-yellow-700 mb-8">User Management</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-yellow-600">Registered Users</h2>
              <Button 
                onClick={fetchUsers}
                variant="outline"
                className="border-yellow-300 text-yellow-700"
              >
                Refresh List
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>{formatDate(user.lastSignIn)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${user.isAdmin ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {/* Don't allow changing own admin status */}
                            {currentUser?.id !== user.id && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => toggleAdminStatus(user.id, user.isAdmin)}
                                className={user.isAdmin 
                                  ? "border-red-300 text-red-700 hover:bg-red-50" 
                                  : "border-yellow-300 text-yellow-700 hover:bg-yellow-50"}
                                title={user.isAdmin ? "Remove admin privileges" : "Grant admin privileges"}
                              >
                                {user.isAdmin ? <UserX size={16} /> : <Shield size={16} />}
                              </Button>
                            )}
                          </div>
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

export default UserManagement;
