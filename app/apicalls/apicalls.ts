import axios, { AxiosResponse } from "axios";

interface Rating {
  rate: number;
  count: number;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const response: AxiosResponse<ProductType[]> = await axios.get(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
