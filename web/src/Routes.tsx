import { Route, Router } from '@redwoodjs/router';
import TasksPage from './pages/TasksPage/TasksPage';


export default function Routes() {
  return (
    <Router>
      <Route notfound page={NotFoundPage} />
      <Route path="/" page={TasksPage} name="tasks" />
    </Router>
  )
}
