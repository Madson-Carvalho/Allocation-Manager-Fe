import './ScaleSelector.css';
import {MONTH, WEEK, YEAR} from "./Scales";
import moment from "moment";
import {useState} from "react";

const ScaleSelector = ({setStartDate, setEndDate}) => {
    const [timeStamp, setTimeStamp] = useState(MONTH);

    return (
        <div>
            <div className="button-select-scale-timeline">
                <button
                    onClick={() => {
                        setStartDate(moment().startOf(WEEK));
                        setEndDate(moment().endOf(WEEK));
                        setTimeStamp(WEEK);
                    }}
                    className={timeStamp === WEEK ? "selected" : ""}
                >
                    Semana
                </button>
                <button
                    onClick={() => {
                        setStartDate(moment().startOf(MONTH));
                        setEndDate(moment().endOf(MONTH));
                        setTimeStamp(MONTH);
                    }}
                    className={timeStamp === MONTH ? "selected" : ""}
                >
                    Mês
                </button>
                <button
                    onClick={() => {
                        setStartDate(moment().startOf(YEAR));
                        setEndDate(moment().endOf(YEAR));
                        setTimeStamp(YEAR);
                    }}
                    className={timeStamp === YEAR ? "selected" : ""}
                >
                    Ano
                </button>
            </div>
        </div>
    );
};

export default ScaleSelector;
