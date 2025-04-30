import { useEffect, useState } from "react";
import carData from './mimicdata.jsx';
import { FiHeart } from 'react-icons/fi'
import { MdOutlineShield } from "react-icons/md";
import { motion, useAnimation } from 'framer-motion';
import './VehicleHealthBlob.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function ListOfIssues() {
  const healthRating = useAnimation();
  const saftyRating = useAnimation();
  const health = carData.vehicle_health;
  const safety = carData.safety_rating;
  const [healthCount, setHealthCount] = useState(0);
  const [safetyCount, setSafetyCount] = useState(0);

  useEffect(() => {
    healthRating.start({ healthCount: health, transition: { duration: 2.5, ease: "easeOut" } });
    saftyRating.start({ safetyCount: safety, transition: { duration: 2.5, ease: "easeOut" } });
  }, [healthRating, saftyRating]);

  return (
    <div className="ListIssues ">
      <h5 className="mb-3 text-center">Vehicle rating</h5>
      <div className="card_health  bg-dark text-white rounded d-flex justify-content-center align-items-center text-white gap-5">
        <div className='d-flex flex-column align-items-center gap-2'>
          <FiHeart className="icon_health rounded-circle p-2" size={45} color='purple' />
          <h5 className='mt-1 mb-0'>Condition</h5>
          <motion.h5 animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }} className="health_rating">
            <motion.span
              className="health_rating_value"
              animate={healthRating}
              onUpdate={(latest) => setHealthCount(Math.round(latest.healthCount))}
            >
              {healthCount}
            </motion.span>
            /10
          </motion.h5>
        </div>
        <div className='d-flex flex-column align-items-center gap-2'>
          <MdOutlineShield className="icon_safety rounded-circle p-2" size={45} color='blue' />
          <h5 className='mt-1 mb-0'>Safety</h5>
          <motion.h5 animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }} className="safety_rating">
            <motion.span
              className="safety_rating_value"
              animate={saftyRating}
              onUpdate={(latest) => setSafetyCount(Math.round(latest.safetyCount))}
            >
              {safetyCount}
            </motion.span>
            /10
          </motion.h5>
        </div>
      </div>
    </div>
  );
}



export default ListOfIssues;
