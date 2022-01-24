import { Grid, Paper } from "@mui/material";
import { HashLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import { MainContent } from "../../common/style";
import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../redux/actions/transactionActions";
import TransactionCard from "../../components/TransactionCard";
import returnTransactionCount from "../../utils/returnTransactionIcon";
const Transactions = ({ isMobile, collapsed }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { userDetails } = useSelector((state) => state.auth);
  const { transactions, selectedTransaction, loading } = useSelector(
    (state) => state.transaction
  );
  useEffect(() => {
    if (userDetails.activeWallet) {
      dispatch(getTransactions(page, userDetails.activeWallet));
    }
  }, [userDetails, page, dispatch]);
  return (
    <MainContent isMobile={isMobile} collapsed={collapsed}>
      <h2 style={{ margin: "1rem 0", fontFamily: "soraBold" }}>TRANSACTIONS</h2>
      <Grid container>
        <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <HashLoader color="#744FC2" size={150} />
            </div>
          )}
          {!loading && (
            <Paper sx={{ p: 2 }}>
              <div style={{ display: "flex" }}>
                <h3 style={{ marginRight: "0.5rem" }}>Transaction history </h3>
                <HistoryIcon />
              </div>
              <div>
                <Grid container spacing={2}>
                  <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                    <TransactionCard
                      category={returnTransactionCount("food")}
                      title={"Went for a movie"}
                      note={"Lorem ipsum"}
                      amount={100}
                      type={"income"}
                      currency={"Rs"}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                    <TransactionCard
                      category={returnTransactionCount("food")}
                      title={"Went for a movie"}
                      note={"Lorem ipsum"}
                      amount={100}
                      type={"income"}
                      currency={"Rs"}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                    <TransactionCard
                      category={returnTransactionCount("food")}
                      title={"Went for a movie"}
                      note={"Lorem ipsum"}
                      amount={100}
                      type={"expense"}
                      currency={"Rs"}
                    />
                  </Grid>
                  <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                    <TransactionCard
                      category={returnTransactionCount("food")}
                      title={"Went for a movie"}
                      note={"Lorem ipsum"}
                      amount={100}
                      type={"income"}
                      currency={"Rs"}
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          )}
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default Transactions;
