import React from "react";
import { useLocation } from "react-router-dom";

function DetailsPage() {
  const { state } = useLocation();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submitted User Info</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default DetailsPage;
