import config from "./common.service";

const Events = async () => {
  try {
    const response = await fetch(
      `${config.bmrServerURL}/api/user/get_sub_category/FindInTrivandrum`
    );
    const res = await response.json();
    const data = res.info || {};
    return data;
  } catch (error) {
    console.error("Error fetching Data:", error);
    return {}; 
  }
};

export default {
  Events
};
