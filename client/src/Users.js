import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Chip } from "primereact/chip";

import "./Users.css";

export default function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: extract as util function and .env
    setIsLoading(true);
    fetch(`http://localhost:4000/users`)
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

  const getStatus = (type) => {
    switch (type) {
      case "access_guest":
        return <Chip className="status status-warning" label="UpComing" />;
      case "access_user":
        return <Chip className="status status-success" label="Active" />;
      default:
        return <Chip className="status status-danger" label="Not Available" />;
    }
  };

  // TODO: make util function
  const formatDate = (d) => {
    var date = new Date(d);
    const month = date.toLocaleString("default", { month: "short" });
    const dat = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();
    return `${month} ${dat} ${hh}:${mm}`;
  };

  return (
    <>
      {data.map((user) => (
        <Card className="card p-shadow-7" key={user.id}>
          <div className="p-d-flex">
            <Avatar label="P" shape="circle" />
            <div className="content">
              <h1>{user.attributes.name}</h1>
              <p>{user.attributes.email}</p>
              {user.type === "access_guest" && (
                <p>
                  {formatDate(user.attributes.starts_at)} -&nbsp;
                  {formatDate(user.attributes.ends_at)}
                </p>
              )}
            </div>
          </div>
          {getStatus(user.type)}
        </Card>
      ))}
    </>
  );
}
