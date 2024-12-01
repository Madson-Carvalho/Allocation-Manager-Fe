import ReactTable from "../../components/ReactTable/ReactTable";
import BasePage from "../../components/basePage/BasePage";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import httpGet from "../../utils/httpRequest/httpGet";
import formatDate from "../../utils/formatDate/formatDate";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import httpRemove from "../../utils/httpRequest/httpRemove";
import {Box, Modal, Typography} from "@mui/material";
import style from "../../utils/modalStyle";
import RegisterProjectForm from "../../components/registerProjectForm/RegisterProjectForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [open, setOpen] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);

    const columns = [
        {
            Header: 'Nome',
            accessor: 'name',
            enableColumFilter: true
        },
        {
            Header: 'Horas de Projeto',
            accessor: 'projectHours',
            Cell: ({ value }) => `${value} hrs`,
            enableColumFilter: true
        },
        {
            Header: 'Horas Restantes',
            accessor: 'hoursRemaining',
            Cell: ({ value }) => `${value} hrs`,
            enableColumFilter: true
        },
        {
            Header: 'Coordenador do Projeto',
            accessor: 'projectCoordinator',
            enableColumFilter: true
        },
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
            const formattedData = data.map(project => {
                const hoursRemaining = project.projectHours - (project.allocatedHours || 0);
                return {
                    ...project,
                    hoursRemaining, 
                    initialDate: formatDate(project.initialDate),
                    deliveryDate: formatDate(project.deliveryDate),
                };
            });
            setProjects(formattedData);
        });
    }, [reloadFlag]);
    

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
        setIsEdit(true);
        setIdToEdit(row?.projectId);
        setOpen(true);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <BasePage onClick={handleOpen}>
            <ReactTable data={projects} columns={columns} onDelete={handleDelete} onEdit={handleEdit} title="Projetos"/>
            <DeleteModal isOpen={isModalOpen}
                         onClose={() => setIsModalOpen(false)}
                         onConfirm={confirmDelete}/>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" align="center" variant="h4" component="h2"
                                style={{color: '#FFF', fontWeight: '700'}}>
                        {!isEdit ? 'Novo Projeto' : 'Editar Projeto'}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={() => ({
                            position: 'absolute',
                            right: 25,
                            top: 15,
                            color: "#FFF",
                        })}
                    >
                        <CloseIcon  sx={{ fontSize: 40 }}/>
                    </IconButton>
                    <RegisterProjectForm setOpen={setOpen} reloadFlag={reloadFlag} setReloadFlag={setReloadFlag}
                                         isEditMode={isEdit} idToEdit={idToEdit}/>
                </Box>
            </Modal>
        </BasePage>
    )
}

export default Home;