import { useState } from "react";


function LicencePlate({ data }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter the data based on the search query
    const LicencePlate = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search Licence plate" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            {LicencePlate.map(item => (
                <p key={item.id}>{item.name}</p>
            ))}
        </div>
    );
}

export default LicencePlate;