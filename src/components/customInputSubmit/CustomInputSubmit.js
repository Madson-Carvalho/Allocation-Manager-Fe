import './CustomInputSubmit.css';

const CustomInputSubmit = ({value, style, disabled}) => {
    return (
        <input className="defaultButton" type="submit" value={value} style={style} disabled={disabled}/>
    )
}

export default CustomInputSubmit;