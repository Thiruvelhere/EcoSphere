export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type ThemeMode = 'light' | 'dark';
