import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/Product';
import agent from '../../app/Api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product | null>(null);
  const[loading, setLoading] = useState(true);
  async function Productdet() {
    id && agent.catalog.details(parseInt(id))
    .then(response=>setProducts(response))
    .catch(error=> console.log(error))
    .finally(()=>setLoading(false));
    
  }

  useEffect(()=>{
    Productdet();
  }, [id])

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
      </Grid>
   </Grid>
  )
}
