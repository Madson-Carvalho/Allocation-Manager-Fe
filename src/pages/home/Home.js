import './Home.css';
import ReactTable from "../../components/ReactTable/ReactTable";
import BasePage from "../../components/basePage/BasePage";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import httpGet from "../../utils/httpRequest/httpGet";
import formatDate from "../../utils/formatDate/formatDate";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import httpRemove from "../../utils/httpRequest/httpRemove";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import Form from "../../components/form/Form";
import CustomMultiSelect from "../../components/customMultiSelect/CustomMultiSelect";

const Home = () => {
    const [projects, setProjects] = useState([]);
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
            Header: 'Horas de Projeto',
            accessor: 'projectHours',
            enableColumFilter: true
        },
        {
            Header: 'Coordenador do Projeto',
            accessor: 'projectCoordinator',
            // enableColumFilter: true
        },
        // {
        //     Header: 'Fonte Financiadora',
        //     accessor: 'fundingSource',
        //     enableColumFilter: true
        // },
        {
            Header: 'Colaboradores',
            accessor: 'employees',
            enableColumFilter: true
        },
        // {
        //     Header: 'Valor Total do Projeto',
        //     accessor: 'totalProjectValue',
        //     enableColumFilter: true
        // },
        {
            Header: 'Data de Início',
            accessor: 'initialDate',
            enableColumFilter: true
        },
        {
            Header: 'Data de Entrega',
            accessor: 'deliveryDate',
            enableColumFilter: true
        }
    ];

    useEffect(() => {
        httpGet('projects/find-all', (data) => {
            const formattedData = data.map(project => ({
                ...project,
                initialDate: formatDate(project.initialDate),
                deliveryDate: formatDate(project.deliveryDate)
            }));
            setProjects(formattedData);
        });
    }, [])

    const removeEntity = (id) => {
        httpRemove('projects/delete-project', id);
        setProjects(prevProjects => prevProjects.filter(project => project.projectId !== id));
    }

    const handleDelete = (row) => {
        setRowToDelete(row);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        removeEntity(rowToDelete.projectId)
        setIsModalOpen(false);
        setRowToDelete(null);
    };

    const handleEdit = (row) => {
        navigate(`/edit-project/${row?.projectId}`);
    };

    return (
        <BasePage url='/create-project'>
            <ReactTable data={projects} columns={columns} onDelete={handleDelete} onEdit={handleEdit} title="Projetos"/>
            {/*<DeleteModal isOpen={isModalOpen}*/}
            {/*             onClose={() => setIsModalOpen(false)}*/}
            {/*             onConfirm={confirmDelete}/>*/}
            <Modal title='Inserir colaborador'
                   isOpen={isModalOpen}
                   onClose={() => setIsModalOpen(false)}
                   onConfirm={confirmDelete}>
                <Form>
                    <CustomMultiSelect options={[]}/>
                </Form>
            </Modal>
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

export default Home;