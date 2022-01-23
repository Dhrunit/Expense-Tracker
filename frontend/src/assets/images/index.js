import styled from "styled-components";
import AuthBackground from "./AuthBackground.png";
import cardEllipse from "./cardEllipse.png";
import emptyDataSvg from "./emptyDataSvg.svg";
import maleEmoji from "./maleEmoji.png";
import maleEmoji1 from "./maleEmoji1.png";
import femaleEmoji from "./femaleEmojis.png";
import rectangle from "./rectangle.svg";

const EmptyDataSvgImg = ({ styles }) => {
  return <StyledEmptySvg src={emptyDataSvg} alt="no_data_present" />;
};

const StyledEmptySvg = styled.img`
  width: 35%;
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
export {
  AuthBackground,
  EmptyDataSvgImg,
  cardEllipse,
  maleEmoji,
  maleEmoji1,
  femaleEmoji,
  rectangle,
};
