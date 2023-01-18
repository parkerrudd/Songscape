import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://wezjdynawimihebombwu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlempkeW5hd2ltaWhlYm9tYnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQwMDEyMTgsImV4cCI6MTk4OTU3NzIxOH0.-UULqF-4Q9XtvwSw0RScR6j0h3ik4_1QkX1Nub5XuhY';
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true, 
    persistSession: true,
    detectSessionInUrl: false
  }
});