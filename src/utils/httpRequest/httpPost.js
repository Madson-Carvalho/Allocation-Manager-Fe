import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const httpPost = (path, pathToRedirect, dataToSave) => {
    const navigate = useNavigate();
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
            setTimeout(() => {
                navigate(pathToRedirect);
            }, 3000);
        })
        .catch(e => toast.error(`Erro ao salvar dados`, e))
}

export default httpPost;