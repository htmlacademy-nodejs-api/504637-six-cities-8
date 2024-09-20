import { TUser } from './user.type.js';

export type TOffer = {
  name: string;
  description: string;
  publishAt: string;
  city: string;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFeatured: boolean;
  rating: number;
  type: 'apartment' | 'house' | 'room' | 'hotel',
  rooms: number;
  guests: number;
  price: number;
  features: 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge',
  user: TUser
  comments: number;
  coordinates: { latitude: number; longitude: number };
};
