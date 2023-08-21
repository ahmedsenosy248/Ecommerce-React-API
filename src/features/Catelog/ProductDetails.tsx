import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/Product';
import agent from '../../app/Api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';

export default function ProductDetails() {
  const{basket, setBasket, removeItem} = useStoreContext();
  const[quantity, setQuantity] = useState(0);
  const[submiting, setSubmiting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product | null>(null);
  const[loading, setLoading] = useState(true);
  async function Productdet() {
    id && agent.catalog.details(parseInt(id))
    .then(response=>setProducts(response))
    .catch(error=> console.log(error))
    .finally(()=>setLoading(false));
    
  }

  const item = basket?.items.find(x=> x.productId == products?.id)

function handleInputChange(event:any){
  if(event.target.value >= 0 ){
    setQuantity(parseInt(event.target.value));
  }
}
function handleUpdateCart(){
  setSubmiting(true);
  if(!item || quantity> item.quantity){
    const updateQuantity = item? quantity - item.quantity : quantity;
    agent.Basket.addItem(products?.id!, updateQuantity)
    .then(bas=>setBasket(bas))
    .catch(err=> console.log(err))
    .finally(()=> setSubmiting(false))
  }else{
    const updateQuantity = item.quantity - quantity;
    agent.Basket.removeItem(products?.id!, updateQuantity)
    .then(()=> removeItem(products?.id!, updateQuantity))
    .catch(err=> console.log(err))
    .finally(()=> setSubmiting(false))

  }
}
  useEffect(()=>{
    if(item) setQuantity(item.quantity);
    Productdet();
  }, [id, item])

  if(loading) return <LoadingComponent message='Loading Details...'></LoadingComponent>
  if(!products) return <NotFound></NotFound>

  return (
   <Grid container spacing={6}>
      <Grid item xs={6}>
          <img src={products.pictureUrl} alt={products.name} style={{width:'100%'}}></img>          
      </Grid>
      <Grid item xs={6}>
          <Typography variant='h3'>
          {products.name}
          </Typography>
          <Divider sx={{mb:2}}></Divider>
          <Typography color='secondary' variant='h4'>
          ${(products.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{products.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{products.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{products.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{products.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{products.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
            onChange={handleInputChange}
            variant='outlined'
            type='number'
            label='Quantity in Cart'
            fullWidth
            value={quantity}
            >
                
            </TextField>

          </Grid>
          <Grid item xs={6}>
              <LoadingButton
              disabled={item?.quantity === quantity || !item && quantity===0}
              loading={submiting}
              onClick={handleUpdateCart}
              sx={{height:'55px'}}
              color='primary'
              size='large'
              variant= 'contained'
              fullWidth
              >
                  {item ? 'Update Quantity' : 'Add to Cart'}
              </LoadingButton>
          </Grid>
         </Grid>
      </Grid>
   </Grid>
  )
}
