import {toast} from "react-toastify";

const httpPost = (path, dataToSave) => {
    const baseUrl = 'http://localhost:8080/api/v1/';

    fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
    })
        .then(response => {
            toast.success(`Dado criado com sucesso!`);
        })
        .catch(e => toast.error(`Erro ao salvar dados ${e}`))
}

export default httpPost;