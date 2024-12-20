import {toast} from "react-toastify";

const httpPut = (path, dataToEdit, setDisabled) => {
    const baseUrl = 'http://localhost:8080/api/v1/';

    fetch(`${baseUrl}${path}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToEdit)
    })
        .then(response => {
            toast.success(`Dado editado com sucesso!`);
            setDisabled(true)
        })
        .catch(e => {
            toast.error(`Erro ao editar dados`, e);
            setDisabled(false)
        });
        
}

export default httpPut;