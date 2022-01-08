import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

let sidebarArray = [
  { name: "Dashboard", to: "/", icon: <DashboardIcon /> },
  { name: "Wallet", to: "/wallet", icon: <AccountBalanceWalletIcon /> },
  { name: "Transactions", to: "/transactions", icon: <PaidIcon /> },
  { name: "Profile", to: "/profile", icon: <AccountCircleIcon /> },
];

export default sidebarArray;
