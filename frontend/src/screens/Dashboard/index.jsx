import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { MainContent } from "../../common/style";
import { Grid } from "@mui/material";
import EmptyContent from "../../components/EmptyContent";
import { getDashboardDetails } from "../../redux/actions/dashboardActions";
import DashboardCard from "../../components/DashboardCard";
import DashboardGraph from "../../components/DashboardGraph";
import SplashScreen from "./helper";
import { useMediaQuery, useTheme, Backdrop } from "@mui/material";
import CategoryExpenseChart from "../../components/CategoryExpenseChart";

export default function Dashboard({ collapsed, isMobile }) {
  const theme = useTheme();
  const isMobileBackdrop = useMediaQuery(theme.breakpoints.down("lg"));

  const dispatch = useDispatch();
  const {
    loading,
    isNewUser,
    dashboardDetails,
    incomeSeries,
    expenseSeries,
    categorySeries,
  } = useSelector((state) => state.dashboard);
  const [openBackdrop, setOpenBackdrop] = useState(isNewUser);
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
      <div style={{ padding: "1rem" }}>
        {!loading && !isNewUser && dashboardDetails.currency && (
          <Grid container spacing={4}>
            <CategoryExpenseChart
              collapsed={collapsed}
              categorySeries={categorySeries}
            />
          </Grid>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <SplashScreen
          closeBackdrop={setOpenBackdrop}
          isMobile={isMobileBackdrop}
        />
      </Backdrop>
    </MainContent>
  );
}
