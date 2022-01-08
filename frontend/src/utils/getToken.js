const getAuthToken = () => {
  let data = JSON.parse(localStorage.getItem("ExpTrackerDetails"));
  if (!data) {
    return false;
  }
  return data.token.trim();
};

export default getAuthToken;
