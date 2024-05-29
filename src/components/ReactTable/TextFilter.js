import './ReactTable.css';

export const TextFilter = ({column}) => {
    const {filterValue, setFilter} = column;
    return (
        <input className="filterInput"
               value={filterValue || ""}
               onChange={e => setFilter(e.target.value || undefined)}
               placeholder={`Digite para buscar`}
        />
    );
};