import './Informations.css';
import BasePage from "../../components/basePage/BasePage";
import GanttCharts from '../../components/ganttCharts/GanttCharts';
import httpGet from "../../utils/httpRequest/httpGet";
import { useEffect, useState } from "react";

const Informations = () => {
  const [data, setData] = useState(null);
  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    httpGet("projects/find-all", setData);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setProjeto(data[0]);
    }
  }, [data]);

  const columns = [
    { type: "string", label: "Task Name" },
    { type: "string", label: "Task ID" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" }
  ];

  const handleProjetoChange = (event) => {
    const projetoSelecionado = data.find(p => p.id === parseInt(event.target.value));
    setProjeto(projetoSelecionado);
  };

  return (
    <>
      <BasePage title={projeto?.name}>
        {data && (
          <>
            <select onChange={handleProjetoChange} value={projeto?.id}>
              {data.map(projeto => (
                <option key={projeto.id} value={projeto.id}>{projeto.name}</option>
              ))}
            </select>
            <GanttCharts columns={columns} projects={data} />
          </>
        )}
      </BasePage>
    </>
  );
};

export default Informations;
