import {TextField} from "@mui/material";

const CustomInput = ({id, label, onChange, value, required, type}) => {

    return (
        <TextField
            id={id}
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            fullWidth
            required={required}
            type={type}
            slotProps={{
                input: {style: {backgroundColor: '#fff', borderRadius: '8px'}},
            }}
        />
    )
}

export default CustomInput