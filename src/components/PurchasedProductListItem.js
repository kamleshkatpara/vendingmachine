import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { returnProduct } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  details: {
    width: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "100%",
    height: 100,
    marginTop: 10,
    [theme.breakpoints.between("sm", "md")]: {
      width: "20%",
      height: 90,
    },
  },
}));

/**
 * This is a Skeleton for Purchased Product
 * @props {product}
 * @returns Single Purchased Product Skeleton
 */
const PurchasedProductListItem = ({ product }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const returnTheProduct = (product) => {
    dispatch(returnProduct(product));
    setOpen(false);
  };

  return (
    <div>
      <Card
        style={{ display: "flex", marginTop: 10 }}
        variant="outlined"
        key={product.id}
      >
        <CardMedia component="img" image={product.image} title={product.name} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Paid: {product.price}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Quantity: {product.quantity}
            </Typography>
            <br />
          </CardContent>
        </div>
        <Grid container justify="flex-end">
          <Button
            fullWidth
            variant="text"
            size="small"
            color="secondary"
            style={{
              textTransform: "none",
              height: "50%",
            }}
            onClick={() => handleClickOpen()}
          >
            Return Back
          </Button>
        </Grid>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you wish to return this product ?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => returnTheProduct(product)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PurchasedProductListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default PurchasedProductListItem;
