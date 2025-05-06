import { useRef } from 'react';
import carData from './mimicdata.jsx';
import './issueBlob.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function IssueBlob({issues}) {
  
  const datas = issues

  function getBadgeColor(value) {
    console.log("value", value);
    if (value >= 70) return 'bg-danger'; // High severity (red)
    if (value >= 30) return 'bg-warning'; // Medium severity (yellow)
    return 'bg-success'; // Low severity (green)
  }

  function getStatus(value) {
    console.log("value", value);
    if (value >= 70) return 'Very likely'; // High severity (red)
    if (value >= 30) return 'Middle ground'; // Medium severity (yellow)
    return 'Not likely'; // Low severity (green)
  }

  function ListOfIssues() {
    return (
      <div className="ListIssues ">
        <h5 className="mb-3 text-center">Common Issues</h5>
        <div className="card_issues shadow-lg  bg-dark text-white rounded d-flex justify-content-center align-items-center text-white">
          <ul className='mt-3'>
            {Object.keys(datas).map((data) => (
              <li key={data} className="list-group-item mb-2">
                {data} :  <span className={`badge ${getBadgeColor(datas[data])}`}>{getStatus(datas[data])}</span>
              </li>
            ))}
          </ul>
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