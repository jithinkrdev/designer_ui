export interface Model {
  _id: string;
  name: string;
  category: string;
  imageUrl: string;
  gender: string;
  createdAt: string;
  __v: number;
}


export interface TryOnResponse {
  imageUrl: string;
  data: {
    imageUrl: string;
    [key: string]: string | number | boolean | object | null;
  };
  status?: string;
  message?: string;
}