export type TOffer = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: {name: string}[]
};
