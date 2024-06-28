import {toast} from "react-toastify";

const httpGet = (path, setData) => {
    const baseUrl = 'http://localhost:8080/api/v1/';

    fetch(`${baseUrl}${path}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => toast.error('Erro ao buscar dados:', error));
}

export default httpGet;