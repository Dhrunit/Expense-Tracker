import { Grid, Paper } from "@mui/material";
import { HashLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainContent } from "../../common/style";
import Button from "../../components/Button";
import WalletCard from "../../components/WalletCard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalculateIcon from "@mui/icons-material/Calculate";
import { addWallet, getWalletDetails } from "../../redux/actions/walletActions";
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

  const [dialogOpen, setDialogOpen] = useState(false);
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
  const handlePage = (event, value) => {
    setPage(value);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const postWallet = () => {
    let postbody = {};
    if (!walletName.trim() || walletName.length < 7) {
      setError((prevState) => [...prevState, "walletName"]);
    } else {
      postbody.name = walletName;
      setError(error.filter((err) => err !== "walletName"));
    }
    if (!initialBalance.trim()) {
      setError((prevState) => [...prevState, "initialBalance"]);
    } else {
      postbody.balance = parseInt(initialBalance);
      setError(error.filter((err) => err !== "initialBalance"));
    }
    if (addBudget) {
      if (!budgetAmount.trim()) {
        setError((prevState) => [...prevState, "budgetAmount"]);
      } else {
        postbody.budgetAmount = parseInt(budgetAmount);
        setError(error.filter((err) => err !== "budgetAmount"));
      }
    } else {
      postbody.budgetAmount = 0;
      setError(error.filter((err) => err !== "budgetAmount"));
    }

    if (error.length === 0) {
      postbody.currency = currency.split(" ")[1];
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
      dispatch(addWallet(postbody));
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
                          walletName={wallet.name}
                          description={
                            wallet.isActiveWallet
                              ? "Is active"
                              : "Is not active"
                          }
                          resetPeriod={wallet.resetPeriod}
                        />
                      </Grid>
                    ))}
                  {walletDetails.length === 0 && (
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Pagination
                    count={paginationCount}
                    page={page}
                    color="primary"
                    shape="rounded"
                    onChange={handlePage}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
      <DialogBox
        onClose={closeDialog}
        open={dialogOpen}
        title={"Add wallet"}
        content={
          <WalletModalContent
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
            type="addWallet"
            loading={dialogLoader}
            onClick={postWallet}
          />
        }
      />
    </MainContent>
  );
};

export default Wallet;
