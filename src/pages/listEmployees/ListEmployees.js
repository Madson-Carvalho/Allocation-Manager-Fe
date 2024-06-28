import ReactTable from "../../components/ReactTable/ReactTable";
import BasePage from "../../components/basePage/BasePage";
import {useEffect, useState} from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import {ToastContainer} from "react-toastify";

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);

    const columns = [
        {
            Header: 'Nome',
            accessor: 'name',
            enableColumFilter: true
        },
        {
            Header: 'E-mail',
            accessor: 'email'
        },
        {
            Header: 'Horas de Trabalho',
            accessor: 'workeHours',
            enableColumFilter: true
        },
        {
            Header: 'Cargo',
            accessor: 'jobRole',
            enableColumFilter: true
        },
        {
            Header: 'Formação',
            accessor: 'qualification',
            enableColumFilter: true
        },
        {
            Header: 'Especializações',
            accessor: 'specializations',
            enableColumFilter: true
        }
    ];

    useEffect(() => {
        httpGet('employees/find-all', setEmployees);
    }, [])

    return (
        <BasePage title='Colaboradores' url='/create-employee'>
            <ReactTable columns={columns} data={employees} title='Colaboradores'/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BasePage>
    )
}

export default ListEmployees