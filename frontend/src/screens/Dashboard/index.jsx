import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { MainContent } from "../../common/style";
import { Grid, Paper } from "@mui/material";
import EmptyContent from "../../components/EmptyContent";
import { getDashboardDetails } from "../../redux/actions/dashboardActions";
import DashboardCard from "../../components/DashboardCard";

export default function Dashboard({ collapsed, isMobile }) {
  const dispatch = useDispatch();
  const { loading, isNewUser, dashboardDetails } = useSelector(
    (state) => state.dashboard
  );
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
          <Grid container spacing={4}>
            <DashboardCard dashboardDetails={dashboardDetails} />
          </Grid>
        )}
      </div>
    </MainContent>
  );
}
