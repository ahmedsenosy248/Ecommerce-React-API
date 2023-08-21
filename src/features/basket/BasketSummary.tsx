import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/Api/agent";
import { CurrencyFormat } from "../../app/util/Util";

export default function BasketSummary(props: any) {

  let subtotal: number = 0;

  props.basket?.items?.forEach((item: { price: number; quantity: number }) => {
    subtotal += item.price * item.quantity;
  });

  let deliveryFee:number = 0.005 * subtotal ;
  if (subtotal===0)
    return <Typography variant="h3"></Typography>
  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{CurrencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{CurrencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{CurrencyFormat(subtotal + deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
