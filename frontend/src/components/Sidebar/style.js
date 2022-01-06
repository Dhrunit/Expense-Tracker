import { AppBar, Drawer } from "@mui/material";
import styled from "styled-components";
import { Brand2Svg } from "../../assets/icons";

export const StyledAppBar = styled(AppBar)`
  padding-left: ${(props) => (props.collapsed ? "70px" : "230px")};
  transition: all 0.5s;
  height: 3.5rem;
`;

export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    width: ${(props) => (props.open ? "230px" : "70px")};
    background-color: #744fc2;
    color: #fff;
    transition: all 0.3s;
    overflow-x: hidden;
  }
`;

export const StyledAppBarMobile = styled(AppBar)`
  transition: all 0.5s;
  height: 3.5rem;
`;

export const StyledDrawerMobile = styled(Drawer)`
  .MuiPaper-root {
    background-color: #744fc2;
    color: #fff;
    transition: all 0.3s;
    overflow-x: hidden;
  }
`;

export const BrandSvgDrawer = () => {
  return (
    <img
      src={Brand2Svg}
      style={{ display: "block", margin: "1rem auto", width: "40px" }}
      alt="brandimage"
    />
  );
};

export const BrandDrawer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img
        src={Brand2Svg}
        style={{
          display: "block",
          margin: "1rem 0",
          width: "40px",
        }}
        alt="brandimage"
      />
      <h3>EXP TRACKER</h3>
    </div>
  );
};

export const BrandDrawerMobile = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img
        src={Brand2Svg}
        style={{
          display: "block",
          margin: "1rem 0",
          width: "35px",
        }}
        alt="brandimage"
      />
      <h4 style={{ marginLeft: "-10px" }}>EXP TRACKER</h4>
    </div>
  );
};
