import { useState, useEffect } from "react";
import "./App.css";

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        setTotalPages(Math.ceil(data.length / rowsPerPage));
      } catch (err) {
        alert('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = employees.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="container">
      <h2 className="heading">Employee Data Table</h2>
      <table className="data-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th className="left-align">ID</th>
            <th className="left-align">Name</th>
            <th className="left-align">Email</th>
            <th className="left-align">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="currentPage">{currentPage}</button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
