import React from 'react'
import { Grid } from '@material-ui/core'


import Product from '../Product/Product'
import useStyles from './styles'

// const products = [
//     {
//         id: 1, name: 'Shoes', description: 'Runnig shoes', price: "$5", image:"https://www.encodedna.com/images/theme/angularjs.png"
//     },
//     {
//         id: 2, name: 'Macbook', description: 'Apple mackbook', price: "$10", image:"https://www.encodedna.com/images/theme/angularjs.png"
//     },

// ]

const Products = ({products}) => {
    const classes =useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}></div>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} ></Product>
                    </Grid>
                ))}

            </Grid>
        </main>
    )

}

export default Products;