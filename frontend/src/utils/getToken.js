const getAuthToken = () => {
  return localStorage.getItem("ExpTrackerToken");
};

export default getAuthToken;
