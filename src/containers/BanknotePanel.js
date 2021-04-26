import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { incrementBalance } from "../store/actions";

/**
 * Skeleton for list of currency notes
 * @props {banknotes}
 * @returns List of currency notes
 */
const BanknotePanel = ({ banknotes }) => {
  const dispatch = useDispatch();

  const onBanknoteClick = (amount) => {
    dispatch(incrementBalance(amount));
  };

  return (
    <Card style={{ marginTop: 10 }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Add Money to wallet
        </Typography>
        {banknotes.map((banknote, key) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onBanknoteClick(banknote)}
            key={banknote}
            style={{ margin: 10 }}
          >
            {" "}
            ₹{banknote}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default BanknotePanel;
