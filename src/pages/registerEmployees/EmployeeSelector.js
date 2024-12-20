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
  isDisabled,
  usageContext = "",
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
      disabled={isDisabled}
      rowId="employeeId"
      className="employee-selector"
      usageContext={usageContext}
    />
  );
}

export default EmployeeSelector;
