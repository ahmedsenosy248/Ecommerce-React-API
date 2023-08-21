import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useEffect, useState } from "react";
import agent from "../../app/Api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { CurrencyFormat } from "../../app/util/Util";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  useEffect(() => {
    // Fetch the updated basket data after removing an item
    const fetchBasketData = async () => {
      try {
        const updatedBasket = await agent.Basket.get();
        setBasket(updatedBasket);
      } catch (error) {
        console.log(error);
      }
    };

    if (status.name.startsWith("del") && !status.loading) {
      fetchBasketData();
    }
  }, [status.name, status.loading, setBasket]);

  function handleAddItem(productId: number, name: string): void {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((bas) => setBasket(bas))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleRemoveItem(
    productId: number,
    quantity = 1,
    name: string
  ): void {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => {
        removeItem(productId, quantity);
      })
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;
  else {
    return (
      <>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">SubTotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basket.items.map((item) => (
                  <TableRow
                    key={item.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center">
                        <img
                          src={item.pictureUrl}
                          alt={item.name}
                          style={{ height: 50, marginRight: 20 }}
                        ></img>
                        <span>{item.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {CurrencyFormat(item.price)}
                    </TableCell>
                    <TableCell align="center">
                      <LoadingButton
                        loading={
                          status.loading &&
                          status.name === "rem" + item.productId
                        }
                        onClick={() =>
                          handleRemoveItem(
                            item.productId,
                            1,
                            "rem" + item.productId
                          )
                        }
                        color="error"
                      >
                        <Remove></Remove>
                      </LoadingButton>
                      {item.quantity}
                      <LoadingButton
                        loading={
                          status.loading &&
                          status.name === "add" + item.productId
                        }
                        onClick={() =>
                          handleAddItem(item.productId, "add" + item.productId)
                        }
                        color="secondary"
                      >
                        <Add></Add>
                      </LoadingButton>
                    </TableCell>
                    <TableCell align="right">
                      ${((item.price / 100) * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <LoadingButton
                        loading={
                          status.loading &&
                          status.name === "del" + item.productId
                        }
                        onClick={() =>
                          handleRemoveItem(
                            item.productId,
                            item.quantity,
                            "del" + item.productId
                          )
                        }
                        color="error"
                      >
                        <Delete></Delete>
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <br></br>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <BasketSummary basket={basket} />
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
