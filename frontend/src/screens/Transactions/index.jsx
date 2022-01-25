import { Grid, Pagination, Paper } from "@mui/material";
import { HashLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import { MainContent } from "../../common/style";
import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import {
  getIndividualTransaction,
  getTransactions,
} from "../../redux/actions/transactionActions";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalculateIcon from "@mui/icons-material/Calculate";
import TransactionCard from "../../components/TransactionCard";
import returnTransactionCount from "../../utils/returnTransactionIcon";
import Button from "../../components/Button";
import DialogBox from "../../components/DialogBox";
import { TransactionDialogActions } from "./helper";
const Transactions = ({ isMobile, collapsed }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [individualLoader, setIndividualLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoader, setDialogLoader] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [error, setError] = useState([]);
  const [title, setTitle] = useState("");
  const [typeOfTransaction, setTypeOfTransaction] = useState("");
  const [categoryOfTransaction, setCategoryOfTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const { userDetails } = useSelector((state) => state.auth);
  const { transactions, selectedTransaction, loading } = useSelector(
    (state) => state.transaction
  );
  useEffect(() => {
    if (userDetails.activeWallet) {
      dispatch(getTransactions(page, userDetails.activeWallet));
    }
  }, [userDetails, page, dispatch]);

  const onEdit = (transactionId) => {
    dispatch(getIndividualTransaction(transactionId, setIndividualLoader));
  };

  const onDelete = (transactionId) => {};

  const handlePage = (event, value) => {
    setPage(value);
  };

  const closeDialog = () => {
    closeDialogAndEmptyData();
  };

  const closeDialogAndEmptyData = () => {
    setError([]);
    setDialogOpen(false);
    setEditMode(false);
  };

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h3 style={{ marginRight: "0.5rem" }}>Transaction history</h3>
                  <HistoryIcon />
                </div>
                <Button
                  type="contained"
                  styles={{
                    width: "150px",
                    height: "2.5rem",
                    margin: "0 !important",
                  }}
                  onClick={() => setDialogOpen(true)}
                >
                  Add
                </Button>
              </div>
              <div>
                <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                  {transactions.length > 0 &&
                    transactions.map((transaction) => (
                      <Grid
                        item
                        xl={3}
                        lg={3}
                        md={6}
                        sm={12}
                        xs={12}
                        key={transaction._id}
                      >
                        <TransactionCard
                          categoryIcon={returnTransactionCount(
                            transaction.category
                          )}
                          id={transaction._id}
                          category={transaction.category}
                          title={transaction.title}
                          note={transaction.note}
                          amount={transaction.amount}
                          type={transaction.type}
                          currency={"Rs"}
                          onEdit={(id) => onEdit(id)}
                          individualLoader={individualLoader}
                          onDelete={onDelete}
                        />
                      </Grid>
                    ))}
                  {!loading && transactions.length === 0 && (
                    <Grid
                      item
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{ textAlign: "center" }}
                    >
                      <CalculateIcon
                        sx={{
                          width: "100px",
                          height: "100px",
                          color: "#744FC2",
                        }}
                      />
                      <BusinessCenterIcon
                        sx={{
                          width: "100px",
                          height: "100px",
                          color: "#98BAE7",
                        }}
                      />
                      <p style={{ margin: "1rem" }}>
                        Please add a transaction to manage your transactions and
                        make the most out of the platform
                      </p>
                    </Grid>
                  )}
                </Grid>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Pagination
                    count={2}
                    page={page}
                    color="primary"
                    shape="rounded"
                    onChange={handlePage}
                  />
                </div>
              </div>
            </Paper>
          )}
        </Grid>
      </Grid>
      <DialogBox
        onClose={closeDialog}
        open={dialogOpen}
        title={isEditMode ? "Edit Transaction" : "Add Transaction"}
        content={"asdasdas"}
        dialogActionContent={
          <TransactionDialogActions
            type={isEditMode ? "editTransaction" : "addTransaction"}
            loading={dialogLoader}
            onClick={() => console.log("called")}
          />
        }
      />
    </MainContent>
  );
};

export default Transactions;
