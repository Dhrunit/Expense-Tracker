const getAuthToken = () => {
  return localStorage.getItem("ExpToken");
};

export default getAuthToken;
