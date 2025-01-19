import React, { useState, useEffect } from 'react';

const List = () => {
    const [data, setData] = useState<any[]>([]); // Update the type based on your API response structure

    useEffect(() => {
        // Replace with your backend endpoint
        fetch('http://localhost:9090/api/companies')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Companies List</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li> // Replace with actual attributes
                ))}
            </ul>
        </div>
    );
};

export default List;