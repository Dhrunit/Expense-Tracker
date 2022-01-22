import Button from "../../components/Button";
import Form from "../../components/Form";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import currencyData from "../../utils/currencyData";

const WalletModalContent = ({
  walletName,
  setWalletName,
  currency,
  setCurrency,
  isActiveWallet,
  setisActiveWallet,
  addBudget,
  setAddBudget,
  initialBalance,
  setInitialBalance,
  budgetAmount,
  setBudgetAmount,
  resetBalance,
  setResetBalance,
  resetPeriod,
  setResetPeriod,
  error,
}) => {
  return (
    <>
      <Grid container spacing={4} alignItems={"center"}>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <Form
            type={"text"}
            name="walletName"
            label={"Wallet Name"}
            placeHolder={"Enter wallet name"}
            value={walletName}
            error={error.includes("walletName")}
            onChange={(evt) => setWalletName(evt.target.value)}
            errorText={
              error.includes("walletName") &&
              "Wallet name should have minimum 6 characters"
            }
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth error={error.includes("currency")}>
            <label style={{ marginTop: "1.2rem", marginBottom: "0.5rem" }}>
              Currency
            </label>
            <Select
              value={currency}
              variant="outlined"
              onChange={(evt) => setCurrency(evt.target.value)}
            >
              {currencyData.map((data) => (
                <MenuItem value={data.title + " " + data.value}>
                  {data.title} {data.value}
                </MenuItem>
              ))}
            </Select>
            {error.includes("currency") && (
              <FormHelperText>Please select currency</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Form
            type={"text"}
            name="initialBalance"
            label={"Initial Balance"}
            placeHolder={"Enter Balance"}
            value={initialBalance}
            error={error.includes("initialBalance")}
            onChange={(evt) => setInitialBalance(evt.target.value)}
            errorText={
              error.includes("initialBalance") && "Please enter initial balance"
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ marginTop: "0" }}>
        <Grid item xl={4} lg={4} md={6} sm={6} xs={6}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActiveWallet}
                  onChange={(evt) => setisActiveWallet(!isActiveWallet)}
                />
              }
              label="Use it as active wallet ?"
            />
          </FormGroup>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={addBudget}
                  onChange={(evt) => setAddBudget(!addBudget)}
                />
              }
              label="Add a budget to this wallet ?"
            />
          </FormGroup>
        </Grid>
      </Grid>
      {addBudget && (
        <Grid container spacing={1}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form
              type={"text"}
              name="budgetAmount"
              label={"Budget Amount"}
              placeHolder={"Enter budget amount"}
              value={budgetAmount}
              error={error.includes("budgetAmount")}
              onChange={(evt) => setBudgetAmount(evt.target.value)}
              errorText={
                error.includes("budgetAmount") && "Please add budget amount"
              }
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={resetBalance}
                    onChange={(evt) => setResetBalance(!resetBalance)}
                  />
                }
                label="Reset initial balance after a period of time ?"
              />
            </FormGroup>
          </Grid>
          {resetBalance && (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <label style={{ marginTop: "1.2rem", marginBottom: "0.5rem" }}>
                  Reset initial balance period
                </label>
                <Select
                  value={resetPeriod}
                  variant="outlined"
                  onChange={(evt) => setResetPeriod(evt.target.value)}
                >
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

const WalletDialogActions = ({ type, loading, onClick }) => {
  if (type === "addWallet") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 1rem",
        }}
      >
        <Button
          type="contained"
          styles={{ height: "2.5rem", width: "200px" }}
          onClick={onClick}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress style={{ width: "25px", height: "25px" }} />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    );
  }
};

export { WalletDialogActions, WalletModalContent };
