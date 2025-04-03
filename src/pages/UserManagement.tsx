
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserRound, UserX, Shield, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_admin: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // In development mode, show mock users if no Supabase connection
      if (import.meta.env.VITE_SUPABASE_URL === undefined || 
          import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        
        // Create mock data for development
        const mockUsers = [
          {
            id: '1',
            email: 'user@example.com',
            created_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            is_admin: false
          },
          {
            id: '2',
            email: 'admin@example.com',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            last_sign_in_at: new Date().toISOString(),
            is_admin: true
          },
          {
            id: '3',
            email: 'customer@example.com',
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            last_sign_in_at: null,
            is_admin: false
          }
        ];
        
        setTimeout(() => {
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
        
        return;
      }
      
      // For production environment with real Supabase connection
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      // Get admin status for each user
      const usersWithAdminStatus = await Promise.all(
        authUsers.users.map(async (user) => {
          const isUserAdmin = await isAdminUser(user.id);
          return {
            id: user.id,
            email: user.email || 'No email',
            created_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at,
            is_admin: isUserAdmin
          };
        })
      );
      
      setUsers(usersWithAdminStatus);
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
  
  const isAdminUser = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error || !data) return false;
      return true;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };
  
  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        // Remove admin status
        const { error } = await supabase
          .from('admin_users')
          .delete()
          .eq('user_id', userId);
          
        if (error) throw error;
        
        toast({
          title: "Admin status removed",
          description: "User is no longer an admin",
        });
      } else {
        // Grant admin status
        const { error } = await supabase
          .from('admin_users')
          .insert({ user_id: userId });
          
        if (error) throw error;
        
        toast({
          title: "Admin status granted",
          description: "User is now an admin",
        });
      }
      
      // Refresh user list
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
                        <TableCell>{formatDate(user.created_at)}</TableCell>
                        <TableCell>{formatDate(user.last_sign_in_at)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${user.is_admin ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user.is_admin ? 'Admin' : 'User'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                              className={user.is_admin 
                                ? "border-red-300 text-red-700 hover:bg-red-50" 
                                : "border-yellow-300 text-yellow-700 hover:bg-yellow-50"}
                              title={user.is_admin ? "Remove admin privileges" : "Grant admin privileges"}
                            >
                              {user.is_admin ? <UserX size={16} /> : <Shield size={16} />}
                            </Button>
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
