import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
//import Axios from "axios";
import React from "react";
import Axios from "axios";

const StockRoomViewDashboard = () => {
  const [listOfStockRoom, setListOfStockRoom] = useState({});
  //const [orgName, setOrgName] = useState({});
  const [error, setError] = useState();
  let history = useHistory();
  const userid = ReactSession.get("username");

  //For testing
  const orgName = "A123"; // This will eventually pull from a react session variable set when a particular org is clicked
  // setOrgName(ReactSession.get("selectedOrg")) -- Not Fully Finished
  //const userid = "Winners";
  //const userid = "username";

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  useEffect(() => {
    Axios.get(`http://localhost:3000/api/v1/users/viewstock/${orgName}`)
      .then((response) => {
        console.log("RESPONSE: ", response.data);
        console.log("OBJ MAP:", Object.entries(response.data)); // => [ ["0", {name}], ["1", {name}], ["2", {name}] ]
        setListOfStockRoom(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [orgName]);

  return (
    <React.Fragment>
      {Object.entries(listOfStockRoom).map(([key, value]) => {
        //FOR DEBUG
        // console.log("key: ", key);
        // console.log("value: ", value);
        return (
          <li className="list-group-item bg-transparent" key={value.name}>
            {Object.entries(value).map((name, key) => {
              console.log("el", name);
              return (
                <div className="container-fluid buttonItem shadowbtn" key={name}>
                  <button className="toggle-btn" data-active="inactive">
                    <span className="btnLabel">{name}</span>
                  </button>
                </div>
              );
            })}
          </li>
        );
      })}
    </React.Fragment>
  );
};
export default StockRoomViewDashboard;