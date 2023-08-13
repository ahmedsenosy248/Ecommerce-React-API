import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Product } from "../../app/models/Product";
import agent from "../../app/Api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { error } from "console";

export default function Catalog() {
  const [products, SetProducts] = useState<Product[]>([]);
  const [loading, Setloading] = useState(true);

  async function GetProducts() {
    agent.catalog.list().then(products=>SetProducts(products))
    .catch(error=>console.log(error))
    .finally(()=> Setloading(false))
  }

 
  useEffect(() => {
    GetProducts();
  }, []);

  if(loading) return <LoadingComponent message="Loading products..."></LoadingComponent>

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
