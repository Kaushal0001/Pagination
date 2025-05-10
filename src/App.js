import React, { useEffect, useState } from 'react';
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
        alert('failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentEmployees = employees.slice(startIdx, startIdx + rowsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Employee List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{backgroundColor:'rgb(24,89,61)',color:'white'}}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='buttonlog'>
        <button onClick={goToPrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 15px' }}>Page {currentPage}</span>
        <button onClick={goToNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
