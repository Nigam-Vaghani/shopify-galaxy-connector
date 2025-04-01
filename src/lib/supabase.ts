
import { createClient } from '@supabase/supabase-js';

// For production, these should be set as environment variables
// For development, we're using placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Show warning in console if environment variables are not set properly
if (import.meta.env.VITE_SUPABASE_URL === undefined || import.meta.env.VITE_SUPABASE_ANON_KEY === undefined) {
  console.warn('Supabase environment variables not found. Using placeholder values. Authentication and database features will not work properly until you set up your Supabase project and add the keys.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function for simulating user admin status in development mode
// In production, this would check against a real Supabase database
export const isAdmin = async (userId: string | undefined): Promise<boolean> => {
  if (!userId) return false;
  
  // In development mode with placeholder values, return true for testing
  if (supabaseUrl.includes('placeholder-supabase-url')) {
    console.log('Using development mode admin check - all users are admins');
    return true;
  }
  
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
