import React from 'react';
import BaseSelector from "../../components/select/BaseSelect";

const getUrl = () => {
  return `projects/find-all`;
}

const ProjectSelector = ({
  defaultValue,
  setValue,
  title= "",
  required = false
}) => {

  return (
    <BaseSelector
      required={required}
      title={title}
      label="name"
      getUrl={getUrl()}
      setValue={setValue}
      value={defaultValue}
      rowId="projectId"
    />
  );
}

export default ProjectSelector;
