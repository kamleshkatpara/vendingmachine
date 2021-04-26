import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { fetchBalance } from "../store/actions";
import Skeleton from "@material-ui/lab/Skeleton";

/**
 * To show user's current balance
 * @returns skeleton to show user's current balance
 */
const BalancePanel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBalance());

    return () => {};
  }, [dispatch]);

  const { isLoading, value, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.balance
  );

  return (
    <div className={{ marginTop: 20 }}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" style={{ marginTop: 10 }}>
            Balance:{" "}
            {isLoading && (
              <Skeleton animation="wave" width="100%" height={20} />
            )}
            {isLoading && <>Loading balance...</>}
            {!isLoading && isSuccess && `₹${value}`}
            {!isLoading && isSuccess && (
              <AccountBalanceWalletIcon
                style={{ margin: 0, position: "absolute" }}
              />
            )}
            {isError && <p>{errorMessage}</p>}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalancePanel;
