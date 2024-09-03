import './ReactTable.css';
import React from "react";
import {useTable, useFilters, usePagination} from "react-table";
import {TextFilter} from "./TextFilter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function ReactTable({columns, data, title, onEdit, onDelete}) {
    const {
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: {pageIndex, pageSize},
        setPageSize
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        usePagination
    );

    return (
        <>
        <div className="tableListSchema">
            <table className="customTable">
                <thead>
                {headerGroups[0].headers.length > 0 ?
                    <tr>
                        <th colSpan={headerGroups[0].headers.length + 1} id="tableTitle">
                            {title}
                        </th>
                    </tr> : null}
                    <tr>
                                <th colSpan={headerGroups[0].headers.length + 1} style={{backgroundColor: "#FF0000"}}>asdasd
                        </th>
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
                                    return <td key={cell.value.id}>{cell.value.map(x => x.name).join(', ')}</td>;
                                }
                                return <td key={cell.id}>{cell.render("Cell")}</td>;
                            })}
                            <td>
                                <button
                                    className='customButton'
                                    onClick={() => onEdit(row.original)}
                                >
                                    <FontAwesomeIcon icon={faPencil} inverse/>
                                </button>
                                <button
                                    className='customButton'
                                    onClick={() => onDelete(row.original)}
                                >
                                    <FontAwesomeIcon icon={faTrash} inverse/>
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
                <select value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}>
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}