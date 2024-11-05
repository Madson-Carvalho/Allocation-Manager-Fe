import React, {useCallback, useEffect, useState} from 'react';
import AsyncSelect from 'react-select/async';
import {toast} from "react-toastify";
import httpGet from "../../utils/httpRequest/httpGet";
import './BaseSelect.css';

const extractLabel = (label, row) => {
    let data = row;
    label.split('.').forEach(x => {
        data = data[x];
    });
    return data;
}

const BaseSelector = ({
                          required = false,
                          label = null,
                          title = '',
                          rowId = 'id',
                          getUrl = null,
                          setValue = null,
                          setValueId,
                          value = null,
                          disabled = false,
                          isMulti = false,
                          placeholder = "-- selecione ou digite para buscar --",
                      }) => {

    const getOptionLabel = useCallback((row) => extractLabel(label, row), [label]);
    const getOptionValue = useCallback((row) => row[rowId], [rowId]);
    const [selectedValue, setSelectedValue] = useState(value);
    const [defaultOptions, setDefaultOptions] = useState([]);

    const fetchData = (filterValue, callback) => {
        return fetch(getUrl).then(x => {
            callback(x)
            setDefaultOptions(x)
            return x;
        }).catch(e => toast.error('Falha ao carregar itens', e));
    }

    useEffect(() => {
        httpGet(getUrl, setDefaultOptions);
    }, [getUrl]);

    const _onChange = (value) => {
        setSelectedValue(value);
        setValueId && setValueId(value?.[rowId]);
        setValue && setValue(value);
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 100,
            position: 'absolute',
            marginTop: '4px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        }),
    };

    return (
        <div className="base-selector">
            {title && <label className="select-title">{title}</label>}
            <AsyncSelect
                isClearable
                isDisabled={disabled}
                required={required}
                defaultOptions={defaultOptions}
                value={selectedValue}
                isMulti={isMulti}
                loadOptions={fetchData}
                onChange={_onChange}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                placeholder={placeholder}
                styles={customStyles}
                isSearchable={false}
            />
        </div>
    );
};

export default BaseSelector;