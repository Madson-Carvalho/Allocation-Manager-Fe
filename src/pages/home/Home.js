import './Home.css';
import Footer from '../../components/footer/Footer';
import Main from "../../components/main/Main";
import ReactTable from "../../components/ReactTable/ReactTable";

const Home = () => {
    const projects = [
        {
            nome: 'Projeto Alpha',
            horasProjeto: 1200,
            coordenador: 'Ana Silva',
            fonteFinanciadora: 'Empresa X',
            colaboradores: 'João, Maria, Pedro',
            valorTotal: 500000,
            dataInicio: '2023-01-15',
            dataEntrega: '2024-01-14'
        },
        {
            nome: 'Projeto Beta',
            horasProjeto: 800,
            coordenador: 'Carlos Souza',
            fonteFinanciadora: 'Governo Y',
            colaboradores: 'Luiza, Rafael, Fernanda',
            valorTotal: 300000,
            dataInicio: '2023-05-20',
            dataEntrega: '2024-05-19'
        }
    ];

    const columns = [
        {
            Header: 'Nome',
            accessor: 'nome',
            enableColumFilter: true
        },
        {
            Header: 'Horas de Projeto',
            accessor: 'horasProjeto',
            enableColumFilter: true
        },
        {
            Header: 'Coordenador do Projeto',
            accessor: 'coordenador',
            enableColumFilter: true
        },
        {
            Header: 'Fonte Financiadora',
            accessor: 'fonteFinanciadora',
            enableColumFilter: true
        },
        {
            Header: 'Colaboradores',
            accessor: 'colaboradores',
            enableColumFilter: true
        },
        {
            Header: 'Valor Total do Projeto',
            accessor: 'valorTotal',
            enableColumFilter: true
        },
        {
            Header: 'Data de Início',
            accessor: 'dataInicio',
            enableColumFilter: true
        },
        {
            Header: 'Data de Entrega',
            accessor: 'dataEntrega',
            enableColumFilter: true
        }
    ];

    return (
        <>
            <Main>
                <ReactTable data={projects} columns={columns} title="Projetos" />
            </Main>
            <Footer/>
        </>
    )
}

export default Home;