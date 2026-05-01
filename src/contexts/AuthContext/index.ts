import { createContext } from 'react';
import type { User } from '@supabase/supabase-js';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
