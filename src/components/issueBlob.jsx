//import { useRef } from 'react';
import carData from './mimicdata.jsx';
import './issueBlob.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function IssueBlob() {
  const issues = carData.common_issues;

  function getBadgeColor() {
    return 'bg-success'; // Low severity (green)
  }

  function ListOfIssues() {
    return (
      <div className="ListIssues ">
        <h5 className="mb-3 text-center">Common Issues</h5>
        <div className="card_issues shadow-lg  bg-dark text-white rounded d-flex justify-content-center align-items-center text-white">
          <ul className='mt-3'>
            {Object.keys(issues).map((issue) => (
              <li key={issue} className="list-group-item mb-2">
                {issue} :  <span className={`badge ${getBadgeColor(issues[issue])}`}>{issues[issue]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  console.log("lol", issues);

  return (
    <>
      <ListOfIssues />
    </>
  );
}

export default IssueBlob;