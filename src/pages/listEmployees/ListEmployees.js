import ReactTable from "../../components/ReactTable/ReactTable";
import BasePage from "../../components/basePage/BasePage";
import { useEffect, useState } from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import { ToastContainer } from "react-toastify";
import httpRemove from "../../utils/httpRequest/httpRemove";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { Box, Modal, Typography } from "@mui/material";
import style from "../../utils/modalStyle";
import RegisterEmployeeForm from "../../components/registerEmployeeForm/RegisterEmployeeForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
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
            Header: 'E-mail',
            accessor: 'email'
        },
        {
            Header: 'Horas de Trabalho',
            accessor: 'workInSeconds',
            Cell: ({ value }) => `${value} hrs`,
            enableColumFilter: true
        },
        {
            Header: 'Projetos Alocados',
            accessor: 'countAllocatedProjects',
            Cell: ({ value }) => (value ? value : 'Nenhum'),
            enableColumFilter: false
        },
        {
            Header: 'Horas Ociosas',
            accessor: 'hoursOtiose',
            Cell: ({ value }) => `${value} hrs`,
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
        httpGet('employees/find-all', (data) => {
            const formattedData = data.map(employee => ({
                ...employee,
                hoursOtiose: (employee.workInSeconds || 0) - (employee.allocatedHours || 0),
                allocatedProjects: employee.allocatedProjects
                    ? employee.allocatedProjects.map(project => project.name).join(', ')
                    : 'Nenhum'
            }));
            setEmployees(formattedData);
        });
    }, [reloadFlag]);
    

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
        setIsEdit(true);
        setIdToEdit(row?.employeeId);
        setOpen(true);
    };

    const handleOpen = () => {
        setIsEdit(false)
        setIdToEdit(null)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <BasePage onClick={handleOpen}>
            <ReactTable columns={columns} data={employees} onDelete={handleDelete} onEdit={handleEdit}
                title='Colaboradores' />
            <DeleteModal isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" align="center" variant="h4" component="h2"
                        style={{ color: '#FFF', fontWeight: '700' }}>
                        {!isEdit ? 'Novo Colaborador' : 'Editar Colaborador'}
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
                        <CloseIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <RegisterEmployeeForm setOpen={setOpen} reloadFlag={reloadFlag} setReloadFlag={setReloadFlag}
                        isEditMode={isEdit} idToEdit={idToEdit} />
                </Box>
            </Modal>

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
        </BasePage>
    )
}

export default ListEmployees