import React, { useState, useEffect } from 'react';

const CompanyList: React.FC = () => {
    const [data, setData] = useState<any[]>([]); // Use the correct type based on your data
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Add the fetch logic here
        fetch(`${process.env.REACT_APP_API_URL}/api/companies`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => setData(data)) // Update state with fetched data
            .catch((err) => setError(err.message)); // Handle errors
    }, []); // Empty dependency array to run only on component mount

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Company List</h1>
            <ul>
                {data.map((company) => (
                    <li key={company.id}>{company.name}</li> // Adjust attributes based on your backend response
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;