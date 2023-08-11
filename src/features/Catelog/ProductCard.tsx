import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard(props: any) {
  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{color:'secondary.main'}}>{props.product.name.charAt(0).toUpperCase()}</Avatar>}
          title={props.product.name}
          titleTypographyProps={{
            sx:{fontWeight:'bold', color:'primary.main'}
          }}
        />

        <CardMedia
          component="img"
          alt="green iguana"
          sx={{height:140, backgroundSize:'contain', bgcolor:'primary.light'}}
          image={props.product.pictureUrl}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5">
            ${(props.product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.product.brand} / {props.product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
          <Button size="small" component={Link} to={`/catalog/${props.product.id}`}>View</Button>
        </CardActions>
      </Card>
    </>
  );
}
