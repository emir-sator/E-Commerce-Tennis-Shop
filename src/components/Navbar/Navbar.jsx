import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/commerce.png'
import useStyles from './styles'

const Navbar = () => {
    const classes=useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography varint="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}></img>
                        Tennis shop v1.0
                    </Typography>
                    <div className={classes.grow}>
                    </div>
                    <div className={classes.button}>
                        <IconButton aria-label="Show cart items" color="inherit"></IconButton>
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCart>

                            </ShoppingCart>
                        </Badge>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
