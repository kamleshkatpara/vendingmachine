import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    height: 350,
    width: 200,
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
    marginTop: 20,
    padding: 12,
  },
});

/**
 * This is a Skeleton for Product
 * @props {products, balance, onClick}
 * @returns Single Product Skeleton
 */
const ProductListItem = ({ product, balance, onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Card variant="outlined">
        <CardMedia
          component="img"
          alt={product.name}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom>{product.name}</Typography>
          <Typography gutterBottom>Price: {product.price}</Typography>
          <Typography gutterBottom>Quantity: {product.quantity}</Typography>
          <CardActions>
            {product.quantity <= 0 ? (
              <Button variant="contained" size="small" disabled>
                Out of stock
              </Button>
            ) : product.price <= balance.value ? (
              <Button
                size="small"
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => onClick(product)}
              >
                Buy
              </Button>
            ) : (
              ""
            )}
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  balance: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default ProductListItem;
