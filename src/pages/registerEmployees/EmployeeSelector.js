import React from 'react';
import BaseSelector from "../../components/select/BaseSelect";

const getUrl = () => {
  return `employees/find-all`;
}

const EmployeeSelector = ({
  defaultValue,
  setValue,
}) => {

  return (
    <BaseSelector
      label="name"
      getUrl={getUrl()}
      setValue={setValue}
      value={defaultValue}
      rowId="employeeId"
      isMulti={true}
    />
  );
}

export default EmployeeSelector;
