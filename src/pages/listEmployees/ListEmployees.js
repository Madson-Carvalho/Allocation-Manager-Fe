import ReactTable from "../../components/ReactTable/ReactTable";
import BasePage from "../../components/basePage/BasePage";
import {useEffect, useState} from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import httpRemove from "../../utils/httpRequest/httpRemove";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const navigate = useNavigate();

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

    const removeEntity = (id) => {
        httpRemove('employees/delete-employee', id);
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.employeeId !== id));
    }

    const handleDelete = (row) => {
        setRowToDelete(row);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        removeEntity(rowToDelete.employeeId)
        setIsModalOpen(false);
        setRowToDelete(null);
    };

    const handleEdit = (row) => {
        navigate(`/edit-employee/${row?.employeeId}`);
    };

    return (
        <BasePage url='/create-employee'>
            <ReactTable columns={columns} data={employees} onDelete={handleDelete} onEdit={handleEdit}
                        title='Colaboradores'/>
            <DeleteModal isOpen={isModalOpen}
                         onClose={() => setIsModalOpen(false)}
                         onConfirm={confirmDelete}/>
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