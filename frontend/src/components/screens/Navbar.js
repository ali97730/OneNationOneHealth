import  React from 'react';
import {useHistory} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



export default function Navbar() {

  const history = useHistory()
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            One Nation One Health
          </Typography>
          <Button onClick={()=>{
              localStorage.removeItem("authToken");
              history.push("/login")
          }} color="inherit">Logout</Button>
        </Toolbar>

      </AppBar>
      
    </Box>
  );
}
