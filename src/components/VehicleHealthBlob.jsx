import carData from "./mimicdata.jsx";
import { FiHeart } from "react-icons/fi";
import { MdOutlineShield } from "react-icons/md";
import "../styles/VehicleHealthBlob.css";

import "bootstrap/dist/css/bootstrap.min.css";

function IssueBlob() {
  const health = carData.vehicle_health;
  const rating = carData.safety_rating;

  function ListOfIssues() {
    return (
      <div className="ListIssues ">
        <h5 className="mb-3 text-center">Vehicle rating</h5>
        <div className="card_health  bg-dark text-white rounded d-flex justify-content-center align-items-center text-white gap-5">
          <div className="d-flex flex-column align-items-center gap-2">
            <FiHeart
              className="icon_health rounded-circle p-2"
              size={45}
              color="purple"
            />
            <h5 className="mt-1 mb-0">Condition</h5>
            <h5 className="health_rating">{health}/10</h5>
          </div>
          <div className="d-flex flex-column align-items-center gap-2">
            <MdOutlineShield
              className="icon_safety rounded-circle p-2"
              size={45}
              color="blue"
            />
            <h5 className="mt-1 mb-0">Safety</h5>
            <h5 className="safety_rating">{rating}/10</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ListOfIssues />
    </>
  );
}

export default IssueBlob;
