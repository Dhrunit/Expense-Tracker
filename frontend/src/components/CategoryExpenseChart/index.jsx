import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import Chart from "react-apexcharts";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
const CategoryExpenseChart = ({ categorySeries, collapsed }) => {
  const [series, setSeries] = useState([
    {
      data: categorySeries,
    },
  ]);
  const [width, setWidth] = useState();
  useEffect(() => {
    if (collapsed) setWidth("100%");
    else setWidth("90%");
  }, [collapsed]);
  let options = {
    chart: {
      toolbar: {
        show: false,
      },
      fontFamily: "soraRegular",
    },

    dataLabels: {
      enabled: false,
    },
    colors: ["#6E3CBC"],
    xaxis: {
      categories: [
        "bills",
        "car",
        "clothes",
        "communications",
        "eatingOut",
        "entertainment",
        "food",
        "gifts",
        "health",
        "house",
        "pets",
        "sports",
        "taxi",
        "toiletry",
        "transport",
        "other",
      ],
    },
  };

  return (
    <Grid item lg={12} md={12} sm={12} xs={12}>
      <Paper elevation={3} sx={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 0.5rem",
          }}
        >
          <h3 style={{ fontSize: "20px" }}>Category wise expense</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="The below shown results are of past one year">
              <IconButton>
                <HelpIcon sx={{ width: "20px" }} />
              </IconButton>
            </Tooltip>
            Monthly
          </div>
        </div>
        <Chart
          options={options}
          series={series}
          type="bar"
          width={width}
          height="370"
        />
      </Paper>
    </Grid>
  );
};

export default CategoryExpenseChart;
