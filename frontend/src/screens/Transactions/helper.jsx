import Button from "../../components/Button";
import Form from "../../components/Form";
import CircularProgress from "@mui/material/CircularProgress";

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
            <CircularProgress style={{ width: "25px", height: "25px" }} />
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
            <CircularProgress style={{ width: "25px", height: "25px" }} />
          ) : (
            "Update"
          )}
        </Button>
      </div>
    );
  }
};

export { TransactionDialogActions };
