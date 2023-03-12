export interface User {
    address: number;
    name: string;
    surname: string;
    imgUrl?: string;
    email: string;
    phone?: string;
    sex?: 'male' | 'female';
    lang?: 'en' | 'it';
  }