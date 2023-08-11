import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import axios from "axios";
import { Product } from "../../app/models/Product";

export default function Catalog() {
  const [products, SetProducts] = useState<Product[]>([]);
  async function GetProducts() {
    var data = await axios.get("https://localhost:44357/api/Products");
   // console.log(data.data);
    SetProducts(data.data);
  }
  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
