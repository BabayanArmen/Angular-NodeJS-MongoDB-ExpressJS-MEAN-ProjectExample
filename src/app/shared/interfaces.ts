export interface Post {
  _id: string;
  title: string;
  content: string;
  creator?: string;
}

export interface User {
  _id: string;
  status: string;
  username: string;
  email: string;
  password: string;
}
