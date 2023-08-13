import { Button, Container, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <Container component={Paper}>
            <Typography gutterBottom variant="h3" sx={{height:400}}>
                Oops - we could not find what you're looking for
            </Typography>
            <Divider></Divider>
            <Button fullWidth component={Link} to='/catalog'> Go Back To Shop</Button>
        </Container>
    )
}
