import TasksCell from 'src/components/Task/TasksCell';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Editor } from 'src/components';
import { TaskStatus } from 'types/graphql';

export default function TasksPage() {
  const [status, setStatus] = React.useState<TaskStatus>('ALL');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as TaskStatus);
  };


  return (
    <main className='bg-background w-full h-screen m-auto p-10'>
      <div className="h-full bg-zinc-950 w-full grid overflow-hidden grid-cols-[16rem_1fr] rounded-lg">
       <aside className='bg-zinc-900 h-full border-r text-foreground p-4'>
       </aside>

       <section className='text-foreground p-4 gap-2 flex flex-col overflow-auto'>
         <Box className="bg-foreground p-4 rounded-lg">
           <InputLabel>Filtrar por Status</InputLabel>
           <FormControl fullWidth>
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

         <Editor />

         <TasksCell  status={status} />
       </section>
     </div>
    </main>
  )
}
