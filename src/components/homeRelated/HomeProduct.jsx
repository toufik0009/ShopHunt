import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import ProductList from "../productRelated/ProductList";
import { useApp } from "../../context/AppContext";

export default function HomeProduct() {
  const { addToCart } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
      <Spinner theme="luxury" boxCount={5} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <ProductList products={products} addToCart={addToCart} />
      </div>
    </div>
  );
}