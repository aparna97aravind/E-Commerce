import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from "../../Assets/As.webp"
import useStyles from "./Styles"
import {Link} from 'react-router-dom'

const Navbar = ({totalItems}) => {
const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" component={Link} to='/' className={classes.title} color="inherit">
            <img src={logo} alt="APPSTORE"  height="25px" className={classes.image} />
            APPSTORE
          </Typography>

          <div className={classes.grow}/>

          <div className={classes.button}>
            <IconButton component={Link} to='/cart' aria-label="Show cart Items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart/>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
