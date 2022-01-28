import { Grid, Paper } from "@mui/material";
import { HashLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainContent } from "../../common/style";
import Button from "../../components/Button";
import WalletCard from "../../components/WalletCard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalculateIcon from "@mui/icons-material/Calculate";
import {
  addWallet,
  deleteWallet,
  getWalletDetails,
  getIndividualWallet,
  editWallet,
} from "../../redux/actions/walletActions";
import Pagination from "@mui/material/Pagination";
import DialogBox from "../../components/DialogBox";
import { WalletDialogActions, WalletModalContent } from "./helper";

const Wallet = ({ collapsed, isMobile }) => {
  const [page, setPage] = useState(1);
  const [walletName, setWalletName] = useState("");
  const [currency, setCurrency] = useState("INR ₹");
  const [isActiveWallet, setisActiveWallet] = useState(false);
  const [addBudget, setAddBudget] = useState(false);
  const [initialBalance, setInitialBalance] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [resetBalance, setResetBalance] = useState(false);
  const [resetPeriod, setResetPeriod] = useState("Weekly");
  const [error, setError] = useState([]);

  const [individualLoader, setIndividualLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const {
    walletDetails,
    loading,
    dialogLoader,
    selectedWalletDetails,
    paginationCount,
  } = useSelector((state) => state.wallet);
  useEffect(() => {
    dispatch(getWalletDetails(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (selectedWalletDetails.name) {
      setWalletName(selectedWalletDetails.name);
      setCurrency(selectedWalletDetails.currency);
      setisActiveWallet(selectedWalletDetails.isActiveWallet);
      setAddBudget(selectedWalletDetails.hasBudget);
      setInitialBalance(selectedWalletDetails.balance?.toString());
      setBudgetAmount(selectedWalletDetails.budgetAmount?.toString());
      setResetBalance(selectedWalletDetails.resetBalance);
      setError([]);
    }
  }, [selectedWalletDetails]);

  const handlePage = (event, value) => {
    setPage(value);
  };
  const closeDialog = () => {
    closeDialogAndEmptyData();
  };

  const postEditWallet = () => {
    let error = validateForm();
    let dispatchAuthDetails = false;
    let authDetails = JSON.parse(localStorage.getItem("ExpTrackerDetails"));
    let postbody = { walletId: selectedWalletDetails._id };
    if (walletName.trim() && walletName.length > 6) {
      postbody.name = walletName;
    }
    if (addBudget) {
      if (budgetAmount.trim()) {
        postbody.budgetAmount = parseInt(budgetAmount);
      }
    } else {
      postbody.budgetAmount = 0;
    }
    if (error.length === 0) {
      // not active in local and tries active
      // set local
      if (
        !authDetails.activeWallet &&
        selectedWalletDetails.isActiveWallet === false &&
        isActiveWallet
      ) {
        authDetails.activeWallet = selectedWalletDetails._id;
        localStorage.setItem("ExpTrackerDetails", JSON.stringify(authDetails));
        dispatchAuthDetails = true;
      }
      if (
        authDetails.activeWallet &&
        selectedWalletDetails.isActiveWallet === false &&
        isActiveWallet
      ) {
        authDetails.activeWallet = selectedWalletDetails._id;
        localStorage.setItem("ExpTrackerDetails", JSON.stringify(authDetails));
        dispatchAuthDetails = true;
      }
      if (!authDetails.activeWallet && isActiveWallet) {
        authDetails.activeWallet = selectedWalletDetails._id;
        localStorage.setItem("ExpTrackerDetails", JSON.stringify(authDetails));
        dispatchAuthDetails = true;
      }
      if (
        authDetails.activeWallet &&
        !isActiveWallet &&
        authDetails.activeWallet === selectedWalletDetails._id
      ) {
        delete authDetails.activeWallet;
        localStorage.setItem("ExpTrackerDetails", JSON.stringify(authDetails));
        dispatchAuthDetails = true;
      }
      postbody.currency = currency;
      postbody.isActiveWallet = isActiveWallet;
      if (addBudget) {
        postbody.hasBudget = true;
      } else {
        postbody.hasBudget = false;
      }
      dispatch(
        editWallet(
          postbody,
          closeDialogAndEmptyData,
          page,
          dispatchAuthDetails,
          authDetails
        )
      );
    }
  };

  const getIndividualWalletDetails = (id) => {
    dispatch(
      getIndividualWallet(id, setIndividualLoader, setEditMode, setDialogOpen)
    );
  };

  const postDeleteWallet = (id) => {
    dispatch(deleteWallet(id, setIndividualLoader, page));
  };

  const closeDialogAndEmptyData = () => {
    setWalletName("");
    setCurrency("INR ₹");
    setisActiveWallet(false);
    setAddBudget(false);
    setInitialBalance("");
    setBudgetAmount("");
    setResetBalance(false);
    setError([]);
    setDialogOpen(false);
    setEditMode(false);
  };

  const validateForm = () => {
    let error = [];
    if (!walletName.trim() || walletName.length < 7) {
      error = [...error, "walletName"];
    } else {
      error = error.filter((err) => err !== "walletName");
    }
    if (!initialBalance.trim()) {
      error = [...error, "initialBalance"];
    } else {
      error = error.filter((err) => err !== "initialBalance");
    }
    if (addBudget) {
      if (!budgetAmount.trim()) {
        error = [...error, "budgetAmount"];
      } else {
        error = error.filter((err) => err !== "budgetAmount");
      }
    } else {
      error = error.filter((err) => err !== "budgetAmount");
    }
    setError(error);
    return error;
  };

  const postWallet = () => {
    let error = validateForm();
    let postbody = {};
    if (walletName.trim() && walletName.length > 6) {
      postbody.name = walletName;
    }
    if (initialBalance.trim()) {
      postbody.balance = parseInt(initialBalance);
    }
    if (addBudget) {
      if (budgetAmount.trim()) {
        postbody.budgetAmount = parseInt(budgetAmount);
      }
    } else {
      postbody.budgetAmount = 0;
    }

    if (error.length === 0) {
      postbody.currency = currency;
      postbody.isActiveWallet = isActiveWallet;
      if (addBudget) {
        postbody.hasBudget = true;
      } else {
        postbody.hasBudget = false;
      }
      if (resetBalance) {
        postbody.resetBalance = true;
        postbody.resetPeriod = resetPeriod;
      } else {
        postbody.resetBalance = false;
        postbody.resetPeriod = "";
      }
      dispatch(addWallet(postbody, closeDialogAndEmptyData, page));
    }
  };

  return (
    <MainContent isMobile={isMobile} collapsed={collapsed}>
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
        <>
          <h2 style={{ margin: "1rem 0", fontFamily: "soraBold" }}>
            WALLET MANAGEMENT
          </h2>
          <Grid container>
            <Grid item xl={12} lg={12} sm={12} md={12}>
              <Paper sx={{ padding: "2rem" }} elevation={2}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h2>Your wallets</h2>
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
                <Grid container sx={{ margin: "2rem 0" }} spacing={0}>
                  {walletDetails.length > 0 &&
                    walletDetails.map((wallet) => (
                      <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <WalletCard
                          id={wallet._id}
                          onDelete={(id) => postDeleteWallet(id)}
                          onEdit={(id) => getIndividualWalletDetails(id)}
                          walletName={wallet.name}
                          description={
                            wallet.isActiveWallet ? "Active" : "Not active"
                          }
                          resetPeriod={wallet.resetPeriod}
                          individualLoader={individualLoader}
                        />
                      </Grid>
                    ))}
                  {!loading && walletDetails.length === 0 && (
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
                        Please add a wallet to manage your wallets and make the
                        most out of the platform
                      </p>
                    </Grid>
                  )}
                </Grid>
                {paginationCount !== 0 && paginationCount !== 1 && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Pagination
                      count={paginationCount}
                      page={page}
                      color="primary"
                      shape="rounded"
                      onChange={handlePage}
                    />
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
      <DialogBox
        onClose={closeDialog}
        open={dialogOpen}
        title={isEditMode ? "Edit Wallet" : "Add wallet"}
        content={
          <WalletModalContent
            isEditMode={isEditMode}
            walletName={walletName}
            setWalletName={setWalletName}
            currency={currency}
            setCurrency={setCurrency}
            isActiveWallet={isActiveWallet}
            setisActiveWallet={setisActiveWallet}
            addBudget={addBudget}
            setAddBudget={setAddBudget}
            initialBalance={initialBalance}
            setInitialBalance={setInitialBalance}
            budgetAmount={budgetAmount}
            setBudgetAmount={setBudgetAmount}
            resetBalance={resetBalance}
            setResetBalance={setResetBalance}
            resetPeriod={resetPeriod}
            setResetPeriod={setResetPeriod}
            error={error}
          />
        }
        dialogActionContent={
          <WalletDialogActions
            type={isEditMode ? "updateWallet" : "addWallet"}
            loading={dialogLoader}
            onClick={isEditMode ? postEditWallet : postWallet}
          />
        }
      />
    </MainContent>
  );
};

export default Wallet;
