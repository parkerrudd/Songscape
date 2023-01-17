import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpfgiafnpcpzqexmkwvw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZmdpYWZucGNwenFleG1rd3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM5MzM3ODYsImV4cCI6MTk4OTUwOTc4Nn0.mXhSm_RuxiWZY_TaxkJF7KJ2QReaqpF8AO6ioEw2-rA'
export const supabase = createClient(supabaseUrl, supabaseKey)