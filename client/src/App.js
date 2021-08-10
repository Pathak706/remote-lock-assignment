import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";

import "./App.css";

// components
import Devices from "./Devices";
import Users from "./Users";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { label: "Devices", icon: "pi pi-fw pi-mobile" },
    { label: "Users", icon: "pi pi-fw pi-user" },
  ];

  return (
    <div className="app">
      {/* Menu bar */}
      <TabMenu
        className="tab-menu"
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
      {activeIndex === 0 ? <Devices /> : <Users />}
    </div>
  );
}

export default App;
