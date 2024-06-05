import './ReactTable.css';
import React from "react";
import {useFilters, usePagination, useTable} from "react-table";
import {TextFilter} from "./TextFilter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

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
        <div className='tableContent'>
            <article>
                <div className='filterName' style={{width: '2rem'}} onClick={() => {}}>
                    <FontAwesomeIcon icon={faFilter} />
                    <h2>Filtros</h2>
                </div>
                {headerGroups.map(headerGroup => (
                    headerGroup.headers.filter(x => x.enableColumFilter)).length > 0 ?
                    <div className="filterContainer" key={headerGroup.id} style={{display: 'none'}}>
                        {headerGroup.headers.filter(x => x.enableColumFilter).map(column => (
                            <div key={column.id}>
                                {column.enableColumFilter ? <strong>{column.render("Header").toUpperCase()}</strong> : null}
                                {column.enableColumFilter ? <TextFilter column={column}/> : null}
                            </div>
                        ))}
                    </div>
                    : null
                )}
            </article>
            <div className="tableListSchema">
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
        </div>
    );
}