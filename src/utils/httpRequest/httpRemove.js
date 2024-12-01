import {toast} from "react-toastify";

const httpRemove = (path, id) => {
    const baseUrl = 'http://localhost:8080/api/v1/';

    fetch(`${baseUrl}${path}/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            toast.success('Registro removido com sucesso!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        .catch(error => toast.error('Erro ao remover registro:', error));
}

export default httpRemove;