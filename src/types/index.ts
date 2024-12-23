export interface Group {
  id: string;
  name: string;
  inhibited: boolean;
  color: string;
  emoji: string;
  created_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
}