import Button from "../../components/Button";
import Form from "../../components/Form";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Grid,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ErrorText } from "../../components/Form/style";

const TransactionDialogContent = ({
  title,
  setTitle,
  typeOfTransaction,
  setTypeOfTransaction,
  categoryOfTransaction,
  setCategoryOfTransaction,
  amount,
  setAmount,
  transactionNote,
  setTransactionNote,
  error,
  date,
  setDate,
}) => {
  return (
    <>
      <Grid container spacing={4} alignItems={"center"}>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <Form
            type={"text"}
            name="title"
            label={"Transaction title"}
            placeHolder={"Enter Transaction title"}
            value={title}
            error={error.includes("title")}
            onChange={(evt) => setTitle(evt.target.value)}
            errorText={error.includes("title") && "Please add title"}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth error={error.includes("typeOfTransaction")}>
            <label style={{ marginTop: "1.2rem", marginBottom: "0.5rem" }}>
              Type of Transaction
            </label>
            <Select
              value={typeOfTransaction}
              variant="outlined"
              onChange={(evt) => setTypeOfTransaction(evt.target.value)}
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
            {error.includes("typeOfTransaction") && (
              <FormHelperText>
                <span style={{ color: "red" }}>
                  Please select type of transaction
                </span>
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <FormControl
            fullWidth
            error={error.includes("categoryOfTransaction")}
          >
            <label style={{ marginTop: "1.2rem", marginBottom: "0.5rem" }}>
              Category of Transaction
            </label>
            <Select
              value={categoryOfTransaction}
              variant="outlined"
              onChange={(evt) => setCategoryOfTransaction(evt.target.value)}
            >
              {categoriesArray.map((el) => (
                <MenuItem value={el.value}>{el.title}</MenuItem>
              ))}
            </Select>
            {error.includes("categoryOfTransaction") && (
              <FormHelperText>
                <span style={{ color: "red" }}>
                  Please select type of transaction
                </span>
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <Form
            type={"number"}
            name="amount"
            label={"Amount"}
            placeHolder={"Enter Amount"}
            value={amount}
            error={error.includes("amount")}
            onChange={(evt) => setAmount(evt.target.value)}
            errorText={error.includes("amount") && "Please enter amount"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems={"center"}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Form
            type={"text"}
            name="note"
            label={"Transaction Note"}
            placeHolder={"Enter Transaction Note"}
            value={transactionNote}
            error={error.includes("note")}
            onChange={(evt) => setTransactionNote(evt.target.value)}
            errorText={error.includes("note") && "Please add note"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems={"center"}>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ marginTop: "1.2rem" }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <label>Date</label>
            <DesktopDatePicker
              inputFormat="dd/M/yyyy"
              value={date}
              onChange={setDate}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: "0.5rem" }}
                  variant="outlined"
                  fullWidth
                  error={error.includes("date")}
                  {...params}
                />
              )}
            />
            <ErrorText>
              {error.includes("date") && "Please enter date"}
            </ErrorText>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};

const TransactionDialogActions = ({ type, loading, onClick }) => {
  if (type === "addTransaction") {
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
            <CircularProgress
              style={{ width: "25px", height: "25px", color: "#fff" }}
            />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    );
  } else {
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
            <CircularProgress
              style={{ width: "25px", height: "25px", color: "#fff" }}
            />
          ) : (
            "Update"
          )}
        </Button>
      </div>
    );
  }
};

const categoriesArray = [
  { title: "Bills", value: "bills" },
  { title: "Car", value: "car" },
  { title: "Clothes", value: "clothes" },
  { title: "Communications", value: "communications" },
  { title: "Eating Out", value: "eatingOut" },
  { title: "Entertainment", value: "entertainment" },
  { title: "Food", value: "food" },
  { title: "Gifts", value: "gifts" },
  { title: "Health", value: "health" },
  { title: "House", value: "house" },
  { title: "Pets", value: "pets" },
  { title: "Sports", value: "sports" },
  { title: "Taxi", value: "taxi" },
  { title: "Toiletry", value: "toiletry" },
  { title: "Transport", value: "transport" },
  { title: "Other", value: "other" },
];

export { TransactionDialogActions, TransactionDialogContent };
