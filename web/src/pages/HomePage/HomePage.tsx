import TasksCell from '@components/Task/TasksCell';


type HomePageProps = {
  status?: string
}

export default function TasksPage({ status }: HomePageProps) {
  console.log("status", status);
  const url = new URL(window.location.href);

  console.log("url", url);

  const handleStatusChange = (e) => {
    const status = e.target.value;


    if(e.target.value === 'ALL'){
      url.searchParams.delete('status');
      return;
    }

    url.searchParams.set('status', status);
  };


  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
              flexDirection: 'column',
            }}
          >
            <label htmlFor="status-select">Status:</label>
            <select
              id="status-select"
              value={status || 'ALL'}
              onChange={handleStatusChange}
            >
              <option value="ALL">Todos</option>
              <option value="PENDING">Pendentes</option>
              <option value="COMPLETED">Concluídos</option>
            </select>
      </div>

      <TasksCell  status="COMPLETED" />
    </div>
  )
}
