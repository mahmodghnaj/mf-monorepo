import React from "react";
import Wizard from "./components/Wizard";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Passport + ID Wizard</h1>
      <Wizard />
    </div>
  );
};

export default App;
