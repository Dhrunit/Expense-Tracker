import React from "react";
import { BrandSvgImage } from "../../common/style";

const NotFound = () => {
  return (
    <div
      style={{
        background: "#744FC2",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BrandSvgImage noMarginStyle={true} width="120px" />
      <div
        style={{
          fontFamily: "soraBold",
          color: "white",
          fontSize: "2rem",
          marginTop: "0.5rem",
        }}
      >
        404 Not Found
      </div>
    </div>
  );
};

export default NotFound;
