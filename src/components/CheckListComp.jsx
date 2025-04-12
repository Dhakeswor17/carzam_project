
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Spinner from "react-bootstrap/Spinner";

function CheckListComp({ checks, isLicensePlateFound }) {
  return (
    <div className="col flex-column">
      <div className="col d-flex justify-content">
        {isLicensePlateFound ? (
          <span style={{ color: "green", fontSize: "1.5rem" }}>✓</span>
        ) : (
          <Spinner
            className="mt-2 me-3"
            animation="grow"
            size="sm"
            style={{ color: checks[0] ? "green" : "red" }}
          />
        )}
        <p>Getting data from...</p>
      </div>
      <div className="col d-flex justify-content">
        {isLicensePlateFound ? (
          <span style={{ color: "green", fontSize: "1.5rem" }}>✓</span>
        ) : (
          <Spinner
            className="mt-2 me-3"
            animation="grow"
            size="sm"
            style={{ color: checks[1] ? "green" : "red" }}
          />
        )}
        <p>Processing....</p>
      </div>
      <div className="col d-flex justify-content">
        {isLicensePlateFound ? (
          <span style={{ color: "green", fontSize: "1.5rem" }}>✓</span>
        ) : (
          <Spinner
            className="mt-2 me-3"
            animation="grow"
            size="sm"
            style={{ color: checks[2] ? "green" : "red" }}
          />
        )}
        <p>Processing....</p>
      </div>
    </div>
  );
}

export default CheckListComp;