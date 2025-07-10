// Home.js
import config from "./common.service";

const Events = async () => {
  try {
    const response = await fetch(
      `${config.bmrServerURL}/api/user/get/city_details/FindInTrivandrum`
    );
    const res = await response.json();
    const data = res.info?.[0] || {};
    return data;
  } catch (error) {
    console.error("Error fetching Data:", error);
    return {}; 
  }
};

export default {
  Events
};
