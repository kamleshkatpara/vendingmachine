import React from "react";
import { Container, CssBaseline, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ProductList from "./containers/ProductList";
import BalancePanel from "./containers/BalancePanel";
import BanknotePanel from "./containers/BanknotePanel";
import PurchasedProductList from "./containers/PurchasedProductList";

/**
 * On application mount we fetch all products, current balance and the purchased products if any using hooks
 * @returns the layout of the application
 */
const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography variant="h4" style={{ marginLeft: 200 }}>
          Vending Machine
        </Typography>
        <Grid container spacing={1}>
          <ProductList />
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <BalancePanel />
            <BanknotePanel banknotes={[10, 20, 50, 100, 200, 500, 2000]} />
            <PurchasedProductList />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
