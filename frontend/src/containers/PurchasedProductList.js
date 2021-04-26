import React, { useEffect } from "react";
import PurchasedProductListItem from "../components/PurchasedProductListItem";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { fetchPurchasedProducts } from "../store/actions";

/**
 * Skeleton to show purchased products list
 * @returns The list of purchased products
 */
const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPurchasedProducts());
    return () => {};
  }, [dispatch]);

  const purchasedProducts = useSelector((state) => state.purchasedProducts);

  return (
    <>
      {purchasedProducts.length > 0 && (
        <Typography variant="h6" style={{ marginTop: 30 }}>
          Your purchased products
        </Typography>
      )}
      {purchasedProducts.map((product, index) => (
        <div key={index}>
          <PurchasedProductListItem product={product} />
        </div>
      ))}
    </>
  );
};

export default ProductList;
