import React, { useEffect } from "react";
import ProductListItem from "../components/ProductListItem";
import { useDispatch, useSelector } from "react-redux";
import map from "lodash/map";
import { buyProduct, fetchProducts } from "../store/actions";
import { Grid, LinearProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

/**
 * Skeleton to show product list
 * @returns The list of products
 */
const ProductList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    return () => {};
  }, [dispatch]);

  const { isLoading, data, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.products
  );
  const balance = useSelector((state) => state.balance);

  const onProductClick = (product) => {
    dispatch(buyProduct(product));
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={8}
      xl={8}
      className={classes.container}
    >
      {isLoading && (
        <div className={classes.root}>
          <LinearProgress color="secondary" />
        </div>
      )}
      {isSuccess &&
        map(data, (product) => (
          <div key={product.id}>
            <ProductListItem
              product={product}
              balance={balance}
              onClick={onProductClick}
            />
          </div>
        ))}
      {isError && <>{errorMessage}</>}
    </Grid>
  );
};

export default ProductList;
