import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";

import "./Devices.css";

import InputSwitch from "./InputSwitch";

export default function Devices() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: extract as util function and .env
    setIsLoading(true);
    fetch(`http://localhost:4000/devices`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  // TODO: make loader screen
  if (isLoading) return <h1>Loading...</h1>;
  //  TODO: make error handling screen
  if (error) return <p>{JSON.stringify(error)}</p>;
  return (
    <>
      {data.map((device) => (
        <Card className="card p-shadow-7" key={device.id}>
          <div className="p-d-flex">
            <Avatar label="P" shape="circle" />
            <div className="content">
              <h1>{device.attributes.name}</h1>
              <p>{device.attributes.model_number}</p>
            </div>
          </div>
          <InputSwitch addClasses="switch" type={device.type} />
        </Card>
      ))}
    </>
  );
}
