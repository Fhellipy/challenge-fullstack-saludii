import TasksCell from 'src/components/Task/TasksCell';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TaskStatus } from 'types/graphql';

export default function TasksPage() {
  const [status, setStatus] = React.useState<TaskStatus>('ALL');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as TaskStatus);
  };


  return (
    <main className='bg-gradient-to-tr from-emerald-500 via-cyan-700 to-blue-500 w-full h-screen m-auto p-10'>
      <div className=" max-w-[85rem] w-full h-full flex flex-col p-6 gap-6 bg-muted rounded-lg mx-auto shadow-custom">
         <Box className="p-4 rounded-lg mx-4 text-muted-foreground shadow-custom">
           <InputLabel>Filtrar por Status</InputLabel>
           <FormControl fullWidth id='form-control'>
               <Select
                 id="demo-simple-select"
                 value={status}
                 label="Status"
                 onChange={handleStatusChange}
               >
                 <MenuItem value="ALL">Todos</MenuItem>
                 <MenuItem value="PENDING">Pendentes</MenuItem>
                 <MenuItem value="COMPLETED">Concluídos</MenuItem>
               </Select>
           </FormControl>
         </Box>

         <TasksCell  status={status} />
     </div>
    </main>
  )
}
