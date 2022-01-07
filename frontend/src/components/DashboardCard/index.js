import React from "react";
import { Grid, Paper } from "@mui/material";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ dashboardDetails }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item lg={4}>
        <Paper elevation={3}>
          <IndividualContent
            title={"Income"}
            amount={dashboardDetails.currency + " " + "42032"}
            subtitle={"4% More than last month"}
            color={"#744FC2"}
            buttonAction={() => navigate("/transactions")}
          />
        </Paper>
      </Grid>
      <Grid item lg={4}>
        <Paper elevation={3}>
          <IndividualContent
            title={"Expenditure"}
            amount={dashboardDetails.currency + " " + "42032"}
            subtitle={"4% More than last month"}
            color={"#744FC2"}
            buttonAction={() => navigate("/transactions")}
          />
        </Paper>
      </Grid>
      <Grid item lg={4}>
        <Paper elevation={3}>
          <IndividualContent
            title={"Remaining"}
            amount={
              dashboardDetails.currency +
              " " +
              dashboardDetails.balance.remaining
            }
            subtitle={"4% More than last month"}
            color={"#744FC2"}
            buttonAction={() => navigate("/transactions")}
          />
        </Paper>
      </Grid>
    </>
  );
};

const IndividualContent = ({
  title,
  amount,
  buttonAction,
  color,
  subtitle,
  subtitleIcon,
}) => {
  return (
    <div style={{ padding: "1.5rem" }}>
      <Grid
        container
        flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <h3>{title}</h3>
        <Button
          type="outlined"
          styles={{ width: "100px", height: "2rem", margin: "0 !important" }}
          onClick={buttonAction}
        >
          Add +
        </Button>
      </Grid>
      <div style={{ margin: "1.5rem 0" }}>
        <h1 style={{ color: color }}>{amount}</h1>
      </div>
      <div>{subtitle}</div>
    </div>
  );
};

export default DashboardCard;
