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
  imageUrl: any;
  data: {
    imageUrl: string;
    [key: string]: any;
  };
  status?: string;
  message?: string;
}