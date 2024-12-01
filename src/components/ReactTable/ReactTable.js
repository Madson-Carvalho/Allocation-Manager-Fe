import './ReactTable.css';
import React, { useState, useEffect, useRef } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ReactTable({ columns, data, title, onEdit, onDelete }) {
    const [filterColumns, setFilterColumns] = useState([]);
    const [filterValues, setFilterValues] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const {
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex, pageSize },
        setPageSize,
        setFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        usePagination
    );

    const handleCheckboxChange = (col) => {
        const updatedColumns = filterColumns.includes(col)
            ? filterColumns.filter(item => item !== col)
            : [...filterColumns, col];
        setFilterColumns(updatedColumns);

        setFilterValues(prevValues => ({
            ...prevValues,
            [col]: prevValues[col] || ""
        }));

        setIsFilterApplied(updatedColumns.length > 0 || Object.values(filterValues).some(value => value !== ""));
    };

    const clearFilters = () => {
        setFilterColumns([]);
        setFilterValues({});
        columns.forEach(col => {
            setFilter(col.accessor, undefined);
        });
        setIsFilterApplied(false);
    };

    return (
        <>
            <div className="filters-wrapper">
                <div className="filter-container">
                        <button className="buttonIcon">
                            <IconButton onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-label="FilterListIcon">
                                <FilterListIcon sx={{ fontSize: 35 }} className="filter-icon" />
                            </IconButton>
                        </button>
                    {isDropdownOpen && (
                        <div className="dropdown-content" ref={dropdownRef}>
                            <div className="checkbox-group">
                                {columns.map((col, index) => (
                                    <label key={index}>
                                        <input
                                            name='name'
                                            type='checkbox'
                                            label=''
                                            placeholder=' '
                                            required={true}
                                            value={col.accessor}
                                            checked={filterColumns.includes(col.accessor)}
                                            onChange={() => handleCheckboxChange(col.accessor)}
                                        />
                                        {col.Header}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="filter-inputs">
                    {filterColumns.map((col, index) => (
                        <div key={index} className="filter-input-group">
                            <input
                                type="text"
                                value={filterValues[col] || ""}
                                onChange={(e) => {
                                    setFilterValues({
                                        ...filterValues,
                                        [col]: e.target.value
                                    });
                                    setFilter(col, e.target.value || undefined);
                                    setIsFilterApplied(true);
                                }}
                                placeholder={`Filtrar por ${columns.find(c => c.accessor === col)?.Header || col}`}
                            />
                        </div>
                    ))}

                    <div className="filter-buttons">
                        {isFilterApplied && (
                            <button className="clear-button" onClick={clearFilters}>Limpar</button>
                        )}
                    </div>
                </div>
            </div>

            <div className="tableListSchema">
                <table className="customTable">
                    <thead>
                        {headerGroups[0]?.headers.length > 0 &&
                            <tr>
                                <th colSpan={headerGroups[0].headers.length + 1} id="tableTitle">
                                    {title}
                                </th>
                            </tr>
                        }
                        <tr>
                            <th id="looseThread" colSpan={headerGroups[0]?.headers.length + 1} style={{ backgroundColor: "#D8D6D6", fontSize: "5px" }}>&nbsp;</th>
                        </tr>
                        {headerGroups.map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th key={column.id}>
                                        {column.render("Header").toUpperCase()}
                                    </th>
                                ))}
                                <th></th> 
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr key={row.id}>
                                    {row.cells.map(cell => {
                                        if (Array.isArray(cell.value)) {
                                            return <td key={cell.value.id}>{cell.value.map(x => x.name).join(", ")}</td>;
                                        } else if (cell.value && typeof cell.value === 'object') {
                                            return <td key={cell.id}>{cell.value.name || JSON.stringify(cell.value)}</td>;
                                        }
                                        return <td key={cell.id}>{cell.render("Cell")}</td>;
                                    })}
                                    <td>
                                        <button
                                            className='actionButton'
                                            onClick={() => onEdit(row.original)}
                                        >
                                            <FontAwesomeIcon icon={faPencil} inverse />
                                        </button>
                                        <button
                                            className='actionButton'
                                            onClick={() => onDelete(row.original)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} inverse />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="tableFooter">
                <div>
                    Página{' '}
                    <em>
                        {pageIndex + 1} de {pageOptions.length}
                    </em>
                </div>
                <div>
                    <button className='customButton' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Anterior
                    </button>
                    <button className='customButton' onClick={() => nextPage()} disabled={!canNextPage}>
                        Próxima
                    </button>
                </div>
                <select
                    className='option'
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20].map(size => (
                        <option key={size} value={size}>
                            Mostrar {size}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
