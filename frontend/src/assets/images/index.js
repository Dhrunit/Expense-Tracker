import styled from "styled-components";
import AuthBackground from "./AuthBackground.png";
import emptyDataSvg from "./emptyDataSvg.svg";
const EmptyDataSvgImg = ({ styles }) => {
  return <StyledEmptySvg src={emptyDataSvg} alt="no_data_present" />;
};

const StyledEmptySvg = styled.img`
  width: 40%;
  margin: 1rem auto;
  @media (max-width: 1200px) {
    width: 45%;
    margin-top: 1rem;
  }
  @media (max-width: 992px) {
    width: 65%;
    margin-top: 1rem;
  }
  @media (max-width: 768px) {
    width: 75%;
    margin-top: 1rem;
  }
  @media (max-width: 576px) {
    width: 85%;
    margin-top: 1rem;
  }
`;
export { AuthBackground, EmptyDataSvgImg };
