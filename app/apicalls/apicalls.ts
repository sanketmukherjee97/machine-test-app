import axios, { AxiosResponse } from "axios";

// Interface to define the structure of a product's rating
interface Rating {
  rate: number; // The average rating of the product
  count: number; // The number of ratings the product has received
}

// Interface to define the structure of a product
export interface ProductType {
  id: number; // The unique identifier for the product
  title: string; // The title of the product
  price: number; // The price of the product
  description: string; // The description of the product
  category: string; // The category to which the product belongs
  image: string; // The URL of the product's image
  rating: Rating; // The rating of the product
}

// Function to fetch the list of products from the API
export const getProducts = async (): Promise<ProductType[]> => {
  try {
    // Perform a GET request to the API to fetch the products
    const response: AxiosResponse<ProductType[]> = await axios.get(
      "https://fakestoreapi.com/products"
    );
    // Return the data (list of products) from the response
    return response.data;
  } catch (error) {
    // Log any errors that occur during the request
    console.error("Error fetching products:", error);
    // Re-throw the error to be handled by the caller
    throw error;
  }
};
