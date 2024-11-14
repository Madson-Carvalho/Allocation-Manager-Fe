import React from 'react';
import BaseSelector from "../../components/select/BaseSelect";

const getUrl = () => {
  return `employees/find-all`;
}

const EmployeeSelector = ({
  defaultValue,
  setValue,
  title = "",
  required = false,
  placeholder = "-- selecione para buscar um colaborador --"
}) => {

  return (
    <BaseSelector
       placeholder={placeholder}
      required={required}
      title={title}
      label="name"
      getUrl={getUrl()}
      setValue={setValue}
      value={defaultValue}
      rowId="employeeId"
    />
  );
}

export default EmployeeSelector;
