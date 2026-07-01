export interface News {
  uuid: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedNews {
  data: News[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}