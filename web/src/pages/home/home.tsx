import TasksPage from '@modules/home/components/TasksPage';


export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <TasksPage  status="ALL" />
    </div>
  )
}
