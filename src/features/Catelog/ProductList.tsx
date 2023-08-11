import {
  Grid,
} from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList(props: any) {
  return (
    <>
      <Grid container spacing={4}>
        {props.products.map((product: any) => (
            <Grid item xs={3} key={product.id}>
                 <ProductCard  product={product}></ProductCard>
            </Grid>         
        ))}
      </Grid>
    </>
  );
}
