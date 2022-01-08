import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { MainContent } from "../../common/style";
import { Grid } from "@mui/material";
import EmptyContent from "../../components/EmptyContent";
import { getDashboardDetails } from "../../redux/actions/dashboardActions";
import DashboardCard from "../../components/DashboardCard";
import DashboardGraph from "../../components/DashboardGraph";

export default function Dashboard({ collapsed, isMobile }) {
  const dispatch = useDispatch();
  const { loading, isNewUser, dashboardDetails, incomeSeries, expenseSeries } =
    useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getDashboardDetails());
  }, [dispatch]);
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
      {!loading && isNewUser && <EmptyContent />}
      <div style={{ padding: "1rem" }}>
        {!loading && !isNewUser && dashboardDetails.currency && (
          <>
            <h2 style={{ margin: "1rem 0" }}>DASHBOARD</h2>
            <Grid container spacing={4}>
              <DashboardCard dashboardDetails={dashboardDetails} />
            </Grid>
          </>
        )}
      </div>
      <div style={{ padding: "1rem" }}>
        {!loading && !isNewUser && dashboardDetails.currency && (
          <Grid container spacing={4}>
            <DashboardGraph
              collapsed={collapsed}
              incomeSeries={incomeSeries}
              expenseSeries={expenseSeries}
            />
          </Grid>
        )}
      </div>
    </MainContent>
  );
}
