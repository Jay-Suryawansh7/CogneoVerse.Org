export interface Department {
  id: number;
  title: string;
  slug: string;
  description: string;
  hero_image?: string;
  blocks: any[]; // Replace with specific Block types later
  team: any[];
  resources: any[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: 'active' | 'completed' | 'planned';
  tags: string[];
  blocks: any[];
  images: string[];
  related_departments: number[]; // IDs
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: number;
  title: string;
  type: 'image' | 'video' | 'document';
  file_url: string;
  body: string;
  author: string;
  published_at?: string;
  hero: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
