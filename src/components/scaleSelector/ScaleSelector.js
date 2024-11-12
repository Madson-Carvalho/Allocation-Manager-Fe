import './ScaleSelector.css';
import {DAY, MONTH, WEEK, YEAR} from "./Scales";
import moment from "moment/moment";

const ScaleSelector = ({ scale, setStartDate, setEndDate, setScale }) => {

    const handleNext = () => {
        setStartDate(prev => moment(prev).add(1, scale));
        setEndDate(prev => moment(prev).add(1, scale));
    };

    const handlePrevious = () => {
        setStartDate(prev => moment(prev).subtract(1, scale));
        setEndDate(prev => moment(prev).subtract(1, scale));
    };

    const handleScaleChange = (newScale) => {
        setScale(newScale);
    };

    return (
        <div>
            <div className="button-select-scale-timeline">
                <button
                    onClick={() => handleScaleChange(DAY)}
                    className={scale === DAY ? "selected" : ""}
                >
                    Dia
                </button>
                <button
                    onClick={() => handleScaleChange(WEEK)}
                    className={scale === WEEK ? "selected" : ""}
                >
                    Semana
                </button>
                <button
                    onClick={() => handleScaleChange(MONTH)}
                    className={scale === MONTH ? "selected" : ""}
                >
                    Mês
                </button>
                <button
                    onClick={() => handleScaleChange(YEAR)}
                    className={scale === YEAR ? "selected" : ""}
                >
                    Ano
                </button>
            </div>
            <div>
                <button onClick={handlePrevious}>Anterior</button>
                <button onClick={handleNext}>Próximo</button>
            </div>
        </div>
    );
};

export default ScaleSelector;
