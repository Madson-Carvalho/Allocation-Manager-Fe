import './CustomInputSubmit.css';

const CustomInputSubmit = ({value}) => {
    return (
        <input className="defaultButton" type="submit" value={value}/>
    )
}

export default CustomInputSubmit;