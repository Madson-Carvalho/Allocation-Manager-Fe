import React from 'react';
import CustomInput from "../customInput/CustomInput";

const FilterPage = ({ filtersConfig, filters, setFilters }) => {

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('Date') && value) {
            const date = new Date(value);
            const isoDate = date.toISOString();
            setFilters((prevFilters) => ({ ...prevFilters, [name]: isoDate }));
        } else {
            setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
        }
    };

    return (
        <div>
            {filtersConfig.map(({ name, type, placeholder }) => (
                <CustomInput
                    key={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={filters[name].value}
                    onChange={handleFilterChange}
                />
            ))}
        </div>
    );
};

export default FilterPage;
