import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useSelector } from 'react-redux';


function ListEmployees() {

    const employees = useSelector((state) => state.employees.employees);
    const [searchTerm, setSearchTerm] = useState('');

    const columns = useMemo(() => [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Start Date', accessor: 'startDate', Cell: ({ value }) => new Date(value).toLocaleDateString() },
        { Header: 'Department', accessor: 'department' },
        { Header: 'Date of Birth', accessor: 'dateOfBirth', Cell: ({ value }) => new Date(value).toLocaleDateString() },
        { Header: 'Street', accessor: 'street' },
        { Header: 'City', accessor: 'city' },
        { Header: 'State', accessor: 'state' },
        { Header: 'Zip Code', accessor: 'zipCode' },
    ], []);

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        const department = employee.department.toLowerCase();
        const city = employee.city.toLowerCase();
        const zipCode = employee.zipCode.toString();
        const dateOfBirth = new Date(employee.dateOfBirth).toLocaleDateString();
        const startDate = new Date(employee.startDate).toLocaleDateString();

        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            department.includes(searchTerm.toLowerCase()) ||
            city.includes(searchTerm.toLowerCase()) ||
            zipCode.includes(searchTerm) ||
            dateOfBirth.includes(searchTerm) ||
            startDate.includes(searchTerm)
            );
        });
    }, [employees, searchTerm]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, 
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
        columns,
        data: filteredEmployees,
        initialState: { pageIndex: 0 }, 
        },
        useSortBy,
        usePagination 
    );

    return (
        <div className='employeesList'>
            <h2>Current Employees</h2>
            <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
                id="selectNumbers"
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
                ))}
            </select>

            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>
                            {column.isSorted ? (
                            column.isSortedDesc ? <span> ▼</span> : <span> ▲</span>
                            ) : <span> ↕</span>}
                        </span>
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row);
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </td>
                        ))}
                    </tr>
                    );
                })}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    Page {pageIndex + 1} of {pageOptions.length > 0 ? pageOptions.length : 1}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
}


export default ListEmployees;
