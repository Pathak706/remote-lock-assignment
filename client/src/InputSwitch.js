import React, { useState } from "react";
import { InputSwitch as Switch } from "primereact/inputswitch";

// TODO: use enum for type check
const InputSwitch = ({ addClasses, type }) => {
  const [checked, setChecked] = useState(type === "lock");

  return (
    <div className={addClasses}>
      <Switch checked={checked} onChange={(e) => setChecked(e.value)} />
      {checked ? (
        <h4 style={{ color: "#23c732" }}>
          <i className="pi pi-lock" style={{ marginRight: "10px" }} />
          Locked
        </h4>
      ) : (
        <h4 style={{ color: "#f44336" }}>
          <i className="pi pi-unlock" style={{ marginRight: "10px" }} />
          Unlocked
        </h4>
      )}
    </div>
  );
};
export default InputSwitch;
