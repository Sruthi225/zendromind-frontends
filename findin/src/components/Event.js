import React, {useEffect, useState} from 'react';
import homeApi from "./Home";

const Event = () => {

  const [loading, setLoading] = useState(true);
  const [Event, setEvent] = useState([]);
  
  const fetchEvent = async () => {
    // try {
    //   const response = await fetch(
    //       `${config.bmrServerURL}/api/user/get/city_details/findintrivandrum`
    //     );
        
    //     const res = await response.json();
    //   let data =
    //     res.info[0].Event && res.info[0].Event.length > 0 && res.info[0].Event
    //       ? res.info[0].Event
    //       : [];
     
    //   // data = [...data.B_Featured === 1].sort(() => Math.random() - 0.5);
    //   setEvent(data);
    // } catch (error) {
    //   console.error("Error fetching Event:", error);
    // }
    // finally {
    //   setLoading(false); // Stop loading after fetch
    // }
     try {
      const data = await homeApi.Events(); // calling the imported API
      const eventData = data.Event?.length ? data.Event : [];
      setEvent(eventData);
    } catch (err) {
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchEvent();
    }, []);
    if (loading) return <p>Loading Events...</p>;

    return (
        <div className="image-grid">
            {Event.map((Event, index) => (
                <a href={`/ImgViews`} className="image-item" key={index}>
                    <img src={Event.V_DigitalType} alt={`Image ${index + 1}`} />
                    <div className="overlay-text">
                        <h2 className="even-head">{Event.V_EventName}</h2>
                        {/* <p className="t-white event-p-line mt-7 mb-10">
                            {Event.V_EventName}
                        </p> */}
                        <div className="event-btn">View More</div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default Event;
