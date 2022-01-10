import styled from "styled-components";
import { AuthBackground } from "../../assets/images/index";
import { BrandSvg } from "../../assets/icons/index";
export const AuthContainer = styled.div`
  background: url(${AuthBackground});
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background-size: cover;
`;

export const BrandHeading = styled.h1`
  padding-top: 2rem;
  text-align: center;
  color: #fff;
  font-family: soraExtraBold;
  font-size: 40px;
`;

export const BrandSvgImage = () => {
  return (
    <img
      src={BrandSvg}
      style={{ display: "block", margin: "0 auto", width: "90px" }}
      alt="brandimage"
    />
  );
};

export const MainContent = ({ collapsed, children, isMobile }) => {
  if (isMobile) {
    return (
      <div
        style={{
          paddingLeft: 0,
          transition: "all 0.3s",
          margin: "2.5rem 2rem",
        }}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        style={{
          paddingLeft: collapsed ? "70px" : "230px",
          margin: "2.5rem 2rem",
          transition: "all 0.3s",
        }}
      >
        {children}
      </div>
    );
  }
};
