import React from 'react';
import BaseSelector from "../../components/select/BaseSelect";

const getUrl = () => {
  return `projects/find-all`;
}

const ProjectSelector = ({
  defaultValue,
  setValue,
  title = "",
  required = false,
  isDisabled,
  usageContext = "",
  placeholder = "-- selecione para buscar um projeto --"
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
      rowId="projectId"
      className="project-selector"
      usageContext={usageContext}
    />
  );

}

export default ProjectSelector;
