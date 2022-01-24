import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HouseIcon from "@mui/icons-material/House";
import PetsIcon from "@mui/icons-material/Pets";
import SportsIcon from "@mui/icons-material/Sports";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import WcIcon from "@mui/icons-material/Wc";
import DirectionsTransitFilledIcon from "@mui/icons-material/DirectionsTransitFilled";
import PunchClockIcon from "@mui/icons-material/PunchClock";

let options = {
  width: "40px",
  height: "40px",
  color: "#fff",
};

const returnTransactionCount = (category) => {
  switch (category) {
    case "bills":
      return <MonetizationOnIcon sx={options} />;
    case "car":
      return <DirectionsCarIcon sx={options} />;
    case "clothes":
      return <CheckroomIcon sx={options} />;
    case "communications":
      return <LocalPhoneIcon sx={options} />;
    case "eatingOut":
      return <RestaurantIcon sx={options} />;
    case "entertainment":
      return <TheaterComedyIcon sx={options} />;
    case "food":
      return <BrunchDiningIcon sx={options} />;
    case "gifts":
      return <CardGiftcardIcon sx={options} />;
    case "health":
      return <HealthAndSafetyIcon sx={options} />;
    case "house":
      return <HouseIcon sx={options} />;
    case "pets":
      return <PetsIcon sx={options} />;
    case "sports":
      return <SportsIcon sx={options} />;
    case "taxi":
      return <LocalTaxiIcon sx={options} />;
    case "toiletry":
      return <WcIcon sx={options} />;
    case "transport":
      return <DirectionsTransitFilledIcon sx={options} />;
    case "other":
      return <PunchClockIcon sx={options} />;
    default:
      return <PunchClockIcon sx={options} />;
  }
};

export default returnTransactionCount;
