import { Grid, Pagination, Paper } from "@mui/material";
import { HashLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import { MainContent } from "../../common/style";
import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
  getIndividualTransaction,
  getTransactions,
} from "../../redux/actions/transactionActions";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalculateIcon from "@mui/icons-material/Calculate";
import TransactionCard from "../../components/TransactionCard";
import returnTransactionCount from "../../utils/returnTransactionIcon";
import Button from "../../components/Button";
import DialogBox from "../../components/DialogBox";
import moment from "moment";
import { TransactionDialogActions, TransactionDialogContent } from "./helper";
const Transactions = ({ isMobile, collapsed }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [individualLoader, setIndividualLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoader, setDialogLoader] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [error, setError] = useState([]);
  const [title, setTitle] = useState("");
  const [typeOfTransaction, setTypeOfTransaction] = useState("expense");
  const [categoryOfTransaction, setCategoryOfTransaction] = useState("bills");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());

  const { userDetails } = useSelector((state) => state.auth);
  const { transactions, selectedTransaction, loading } = useSelector(
    (state) => state.transaction
  );
  useEffect(() => {
    if (userDetails.activeWallet) {
      dispatch(getTransactions(page, userDetails.activeWallet));
    }
  }, [userDetails, page, dispatch]);

  useEffect(() => {
    if (selectedTransaction.title) {
      let dateFormatted =
        selectedTransaction.date.split("/")[1] +
        "/" +
        selectedTransaction.date.split("/")[0] +
        "/" +
        selectedTransaction.date.split("/")[2];
      setTitle(selectedTransaction.title);
      setTypeOfTransaction(selectedTransaction.type);
      setCategoryOfTransaction(selectedTransaction.category);
      setAmount(selectedTransaction.amount);
      setNote(selectedTransaction.note);
      setDate(new Date(dateFormatted));
      setEditMode(true);
      setError([]);
    }
  }, [selectedTransaction]);

  const onEdit = (transactionId) => {
    dispatch(
      getIndividualTransaction(
        transactionId,
        setIndividualLoader,
        setDialogOpen
      )
    );
  };

  const onDelete = (transactionId) => {
    dispatch(
      deleteTransaction(
        transactionId,
        setIndividualLoader,
        page,
        userDetails.activeWallet
      )
    );
  };
  const handleDate = (newValue) => {
    if (!newValue) {
      setDate("Invalid Date");
    } else {
      setDate(newValue);
    }
  };

  const validateForm = () => {
    let error = [];
    if (!title.trim()) {
      error = [...error, "title"];
    } else {
      error = error.filter((err) => err !== "title");
    }
    if (!typeOfTransaction.trim()) {
      error = [...error, "typeOfTransaction"];
    } else {
      error = error.filter((err) => err !== "typeOfTransaction");
    }
    if (!categoryOfTransaction.trim()) {
      error = [...error, "categoryOfTransaction"];
    } else {
      error = error.filter((err) => err !== "categoryOfTransaction");
    }
    if (!amount.trim()) {
      error = [...error, "amount"];
    } else {
      error = error.filter((err) => err !== "amount");
    }
    if (!note.trim()) {
      error = [...error, "note"];
    } else {
      error = error.filter((err) => err !== "note");
    }
    if (!date) {
      error = [...error, "date"];
    } else {
      error = error.filter((err) => err !== "date");
    }
    setError(error);
    return error;
  };

  const postTransaction = () => {
    let result = validateForm();
    if (result.length === 0) {
      let postBody = {};
      postBody.title = title;
      postBody.wallet = userDetails.activeWallet;
      postBody.note = note;
      postBody.category = categoryOfTransaction;
      postBody.type = typeOfTransaction;
      postBody.amount = amount;
      postBody.date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      dispatch(
        addTransaction(
          postBody,
          setDialogLoader,
          page,
          userDetails.activeWallet,
          closeDialogAndEmptyData
        )
      );
    }
  };

  const postEditTransaction = (transactionId) => {
    let result = validateForm();
    if (result.length === 0) {
      let postBody = {};
      postBody.title = title;
      postBody.transactionId = transactionId;
      postBody.note = note;
      postBody.category = categoryOfTransaction;
      postBody.type = typeOfTransaction;
      postBody.amount = amount;
      postBody.date = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    }
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const closeDialog = () => {
    closeDialogAndEmptyData();
  };

  const closeDialogAndEmptyData = () => {
    setTitle("");
    setTypeOfTransaction("expense");
    setCategoryOfTransaction("bills");
    setAmount("");
    setNote("");
    setDate(new Date());
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
                          onDelete={(id) => onDelete(id)}
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
        content={
          <TransactionDialogContent
            title={title}
            setTitle={setTitle}
            typeOfTransaction={typeOfTransaction}
            setTypeOfTransaction={setTypeOfTransaction}
            categoryOfTransaction={categoryOfTransaction}
            setCategoryOfTransaction={setCategoryOfTransaction}
            amount={amount}
            setAmount={setAmount}
            transactionNote={note}
            date={date}
            setDate={handleDate}
            setTransactionNote={setNote}
            error={error}
          />
        }
        dialogActionContent={
          <TransactionDialogActions
            type={isEditMode ? "editTransaction" : "addTransaction"}
            loading={dialogLoader}
            onClick={() =>
              isEditMode ? postEditTransaction() : postTransaction()
            }
          />
        }
      />
    </MainContent>
  );
};

export default Transactions;
