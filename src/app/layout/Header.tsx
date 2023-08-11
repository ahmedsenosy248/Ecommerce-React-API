import { AppBar, Switch, Toolbar, Typography, styled } from '@mui/material'
import React from 'react'
interface Props{
  darkMode : boolean;
  toggleDarkMode : ()=>void;
}
export default function Header({toggleDarkMode, darkMode} : Props) {
   
  return (
    <AppBar position='static'sx={{mb:4}}>
        <Toolbar>
            <Typography variant='h6'>
                RE-STore
                
            </Typography>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
            
        </Toolbar>
    </AppBar>
  )
}
