export default function getUserDetails() {
  let data = JSON.parse(localStorage.getItem("ExpTrackerDetails"));
  if (data && data.email && data.token) {
    return data;
  }
  return false;
}
