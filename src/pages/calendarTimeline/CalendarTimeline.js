import Timeline from "react-calendar-timeline";
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import BasePage from "../../components/basePage/BasePage";
import { useEffect, useState } from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import './CalendarTimeline.css';
import DetailsCard from "../../components/detailsCard/DetailsCard";
import EmployeeSelector from "../registerEmployees/EmployeeSelector";
import ProjectSelector from "../registerProject/ProjectSelector";
import { MONTH } from "../../components/scaleSelector/Scales";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, Typography } from "@mui/material";
import style from "../../utils/modalStyle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RegisterAllocationForm from "../../components/registerAllocationForm/RegisterAllocationForm";
import { ToastContainer } from "react-toastify";
import ScaleSelector from "../../components/scaleSelector/ScaleSelector";
import TimelineHeaders from "react-calendar-timeline/lib/lib/headers/TimelineHeaders";
import SidebarHeader from "react-calendar-timeline/lib/lib/headers/SidebarHeader";
import DateHeader from "react-calendar-timeline/lib/lib/headers/DateHeader";

const CalendarTimeline = () => {

    const VIEW_PROJECTS = 'Visualizar projetos';
    const VIEW_EMPLOYEES = 'Visualizar colaboradores';
    const buttonStyle = {
        backgroundColor: '#2A63A9',
        color: 'white',
        padding: '0.6rem 0.3rem',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '5px 5px 5px 0 rgba(0, 0, 0, 0.3)',
        width: '25%',
    }

    const [allocations, setAllocations] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [project, setProject] = useState(null);
    const [filters, setFilters] = useState({ employeeId: '', projectId: '', startDate: '', endDate: '' });
    const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
    const [isEmployeeAsGroup, setIsEmployeeAsGroup] = useState(true);
    const [open, setOpen] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(false);

    const [startDate, setStartDate] = useState(moment().startOf(MONTH));
    const [endDate, setEndDate] = useState(moment().endOf(MONTH));

    const groupsAsEmployee = allocations?.map((allocation, index) => ({
        id: `${allocation.employee.employeeId}-${index}`,
        title: allocation.employee.name
    })) ?? [];

    const itemsAsEmployee = allocations?.map((allocation, index) => ({
        id: `${allocation.project.projectId}-${index}`,
        group: `${allocation.employee.employeeId}-${index}`,
        title: allocation.project.name,
        start_time: moment(allocation.startDate),
        end_time: moment(allocation.endDate),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
    })) ?? [];

    const groupsAsProject = allocations?.map((allocation, index) => ({
        id: `${allocation.project.projectId}-${index}`,
        title: allocation.project.name,
    })) ?? [];

    const itemsAsProject = allocations?.map((allocation, index) => ({
        id: `${allocation.employee.employeeId}-${index}`,
        group: `${allocation.project.projectId}-${index}`,
        title: allocation.employee.name,
        start_time: moment(allocation.startDate),
        end_time: moment(allocation.endDate),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
        additionalData: {
            jobRole: allocation.employee.jobRole,
            qualification: allocation.employee.qualification,
            specializations: allocation.employee.specializations,
        },
    })) ?? [];

    const groups = isEmployeeAsGroup ? groupsAsEmployee : groupsAsProject;
    const items = isEmployeeAsGroup ? itemsAsEmployee : itemsAsProject;

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            employeeId: employee?.employeeId,
            projectId: project?.projectId,
        }));
    }, [employee, project]);

    useEffect(() => {
        const params = mountFilter();
        const url = `allocations/find-all?${params.toString()}`;

        httpGet(url, (data) => {
            const updatedData = data.map(allocation => ({
                ...allocation,
                project: typeof allocation.project === 'string'
                    ? getProjectDetails(allocation.project, data)
                    : allocation.project,
                employee: typeof allocation.employee === 'string'
                    ? getEmployeeDetails(allocation.employee, data)
                    : allocation.employee,
            }));
            console.log(updatedData)
            setAllocations(updatedData);
        });
    }, [filters]);

    const getProjectDetails = (projectId, data) => {
        return data.find(allocation =>
            allocation.project && typeof allocation.project === 'object' && allocation.project.projectId === projectId
        )?.project;
    };

    const getEmployeeDetails = (employeeId, data) => {
        return data.find(allocation =>
            allocation.employee && typeof allocation.employee === 'object' && allocation.employee.employeeId === employeeId
        )?.employee;
    };

    useEffect(() => {
        const handleMouseClick = (event) => {
            setCardPosition({ top: event.clientY, left: event.clientX });
        };
        window.addEventListener("click", handleMouseClick);
        return () => window.removeEventListener("click", handleMouseClick);
    }, []);

    const mountFilter = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });
        return params;
    };

    const handleItemClick = (itemId) => {
        let selectedAllocation;

        if (isEmployeeAsGroup) {
            selectedAllocation = allocations.find(allocation => allocation.project.projectId === itemId.replace(/-\d+$/, ''));
        } else {
            selectedAllocation = allocations.find(allocation => allocation.employee.employeeId === itemId.replace(/-\d+$/, ''));
        }

        setSelectedItem(selectedAllocation);
    };

    const toggleView = () => {
        setIsEmployeeAsGroup(prev => !prev);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <BasePage onClick={handleOpen}>
            <Box
                display="flex"
                justifyContent="space-evelin"
                alignItems="center"
                p={2}
                gap={2}
            >
                <Button style={buttonStyle} onClick={toggleView}>
                    {isEmployeeAsGroup ? VIEW_PROJECTS : VIEW_EMPLOYEES}
                </Button>
                <ProjectSelector
                    setValue={setProject}
                    isDisabled={isEmployeeAsGroup}
                    usageContext="calendar-timeline-context"
                />
                <EmployeeSelector
                    setValue={setEmployee}
                    isDisabled={!isEmployeeAsGroup}
                    usageContext="calendar-timeline-context"
                />
            </Box>
            {items && items.length > 0 ? (
                <div style={{ margin: '2rem' }}>
                    <ScaleSelector
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                    <Timeline
                        key={`${startDate}-${endDate}`}
                        groups={groups}
                        items={items}
                        onItemClick={(itemId, e) => handleItemClick(itemId, e, isEmployeeAsGroup)}
                        defaultTimeStart={startDate}
                        defaultTimeEnd={endDate}
                        lineHeight={50}
                        itemHeight={100}
                        canMove={true}
                        canResize={true}
                        canChangeGroup={true}
                    >
                        <TimelineHeaders>
                            <SidebarHeader>
                                {({ getRootProps }) => {
                                    return <Typography {...getRootProps()} alignSelf={'center'}
                                        color='#FFF'><strong>{isEmployeeAsGroup ? 'Colaborador' : 'Projeto'}</strong></Typography>
                                }}
                            </SidebarHeader>
                            <DateHeader unit="primaryHeader" />
                            <DateHeader />
                        </TimelineHeaders>
                    </Timeline>
                </div>
            ) : (
                <div className="no-allocations-container">
                    <div className="no-allocations-message">
                        <FontAwesomeIcon icon={faExclamationTriangle} color={'red'} fontSize={'60px'} />
                        <p>Não há alocações para exibir.</p>
                        <p className="no-allocations-description">
                            Verifique se há alocações disponíveis ou se o filtro foi corretamente selecionado.
                        </p>
                    </div>
                </div>
            )}
            {selectedItem && (
                <DetailsCard
                    selectedItem={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    position={cardPosition}
                    isEmployee={isEmployeeAsGroup}
                />
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" align="center" variant="h4" component="h2"
                        style={{ color: '#FFF', fontWeight: '700' }}>
                        Alocar Colaborador
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
                    <RegisterAllocationForm setOpen={setOpen} reloadFlag={reloadFlag} setReloadFlag={setReloadFlag} />
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
    );

};

export default CalendarTimeline;
