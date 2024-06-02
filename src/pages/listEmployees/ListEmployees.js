import ReactTable from "../../components/ReactTable/ReactTable";
import BasePage from "../../components/basePage/BasePage";

const ListEmployees = () => {
    const employees = [
        {
            nome: 'João Silva',
            email: 'joao.silva@example.com',
            horasTrabalho: 40,
            cargo: 'Desenvolvedor',
            salarioHora: 50,
            formacao: 'Engenharia da Computação',
            especializacoes: 'React, Node.js',
            senioridade: 'Pleno'
        },
        {
            nome: 'Maria Oliveira',
            email: 'maria.oliveira@example.com',
            horasTrabalho: 35,
            cargo: 'Analista de Sistemas',
            salarioHora: 45,
            formacao: 'Ciência da Computação',
            especializacoes: 'SQL, Python',
            senioridade: 'Sênior'
        }
    ];

    const columns = [
        {
            Header: 'Nome',
            accessor: 'nome',
            enableColumFilter: true
        },
        {
            Header: 'E-mail',
            accessor: 'email'
        },
        {
            Header: 'Horas de Trabalho',
            accessor: 'horasTrabalho',
            enableColumFilter: true
        },
        {
            Header: 'Cargo',
            accessor: 'cargo',
            enableColumFilter: true
        },
        {
            Header: 'Salário/H',
            accessor: 'salarioHora',
            enableColumFilter: true
        },
        {
            Header: 'Formação',
            accessor: 'formacao',
            enableColumFilter: true
        },
        {
            Header: 'Especializações',
            accessor: 'especializacoes',
            enableColumFilter: true
        },
        {
            Header: 'Senioridade',
            accessor: 'senioridade',
            enableColumFilter: true
        }
    ];

    return (
        <BasePage title='Colaboradores' url='/create-employee'>
            <ReactTable columns={columns} data={employees} title='Colaboradores'/>
        </BasePage>
    )
}

export default ListEmployees