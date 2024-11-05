import React from 'react';
import BaseSelector from "../../components/select/BaseSelect";

const getUrl = () => {
  return `projects/find-all`;
}

const ProjectSelector = ({
  defaultValue,
  setValue,
    title= "Projeto"
}) => {

  return (
    <BaseSelector
        title={title}
      label="name"
      getUrl={getUrl()}
      setValue={setValue}
      value={defaultValue}
      rowId="projectId"
      isMulti={true}
    />
  );
}

export default ProjectSelector;
