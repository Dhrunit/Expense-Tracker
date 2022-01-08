import React from "react";
import { Grid, Paper } from "@mui/material";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const returnSubTitleText = (percentage) => {
  if (percentage > 0) {
    return `${percentage}% More than last month`;
  } else if (percentage === 0) {
    return `Same as last month`;
  } else {
    return `${percentage}% Less than last month`;
  }
};

const returnSubtitleIcon = (percentage) => {
  if (percentage > 0) {
    return <ArrowUpwardIcon sx={{ color: "lightgreen" }} />;
  } else if (percentage === 0) {
    return "";
  } else {
    return <ArrowDownwardIcon sx={{ color: "red" }} />;
  }
};

const DashboardCard = ({ dashboardDetails }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Paper elevation={3}>
          <IndividualContent
            title={"Income"}
            amount={dashboardDetails.currency + " " + dashboardDetails.income}
            subtitle={returnSubTitleText(dashboardDetails.percentageIncome)}
            color={"#744FC2"}
            buttonAction={() => navigate("/transactions")}
            subtitleIcon={returnSubtitleIcon(dashboardDetails.percentageIncome)}
          />
        </Paper>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Paper elevation={3}>
          <IndividualContent
            title={"Expenditure"}
            amount={dashboardDetails.currency + " " + dashboardDetails.expense}
            subtitle={returnSubTitleText(dashboardDetails.percentageExpense)}
            color={"#744FC2"}
            buttonAction={() => navigate("/transactions")}
            subtitleIcon={returnSubtitleIcon(
              dashboardDetails.percentageExpense
            )}
          />
        </Paper>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Paper elevation={3}>
          <IndividualContent
            title={"Remaining"}
            amount={
              dashboardDetails.currency +
              " " +
              dashboardDetails.balance.remaining
            }
            subtitle={
              dashboardDetails.balance.underBudget ? (
                <span style={{ color: "green" }}>You are under budget</span>
              ) : (
                <span style={{ color: "red" }}>You are not under budget</span>
              )
            }
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
          styles={{ width: "75px", height: "2rem", margin: "0 !important" }}
          onClick={buttonAction}
        >
          Add +
        </Button>
      </Grid>
      <div style={{ margin: "1.5rem 0" }}>
        <h1 style={{ color: color }}>{amount}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {subtitleIcon}
        {subtitle}
      </div>
    </div>
  );
};

export default DashboardCard;
