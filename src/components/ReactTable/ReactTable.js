import './ReactTable.css';
import React from "react";
import {useTable, useFilters, usePagination} from "react-table";
import {TextFilter} from "./TextFilter";

export default function ReactTable({columns, data, title}) {
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
        <div className="tableListSchema">
            {headerGroups.map(headerGroup => (
                headerGroup.headers.filter(x => x.enableColumFilter)).length > 0 ?
                <div className="filterContainer" key={headerGroup.id}>
                    {headerGroup.headers.filter(x => x.enableColumFilter).map(column => (
                        <div key={column.id}>
                            {column.enableColumFilter ? <b>{column.render("Header").toUpperCase()}</b> : null}
                            {column.enableColumFilter ? <TextFilter column={column}/> : null}
                        </div>
                    ))}
                </div>
                : null
            )}
            <table className="customTable">
                <thead>
                {headerGroups[0].headers.length > 0 ?
                    <tr>
                        <th colSpan={headerGroups[0].headers.length} id="tableTitle">
                            {title}
                        </th>
                    </tr> : null}
                {headerGroups.map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(column => (
                            <th key={column.id}>
                                {column.render("Header").toUpperCase()}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {page.map((row) => {
                    prepareRow(row);
                    return (
                        <tr key={row.id}>
                            {row.cells.map(cell => {
                                return <td key={cell.id}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
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
        </div>
    );
}