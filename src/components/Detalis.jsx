import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ModalContainer } from './TaskDetails';
import EditDropdown from './EditDtopDown';

function Details({context, currentTask, setInModal, setDeleteTask, editMenu, setEditMenu, subtasks, setEdit}) {

    return(
        <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}>
            <div className='task-name'>
                <p className='task-title'>
                        {currentTask.title}
                </p>
                <span onClick={() => setEditMenu(curr => !curr)} className='menu-button'>
                    <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                    {editMenu && <EditDropdown setDeleteTask={setDeleteTask} setEdit={setEdit}/>}   
                </span>
            </div>
          

            <p className='task-description'>
                {currentTask.description}
            </p>
            <p className='subtasks'>
               Subtasks ({subtasks} of {currentTask.subtasks.length})
            </p>

            {currentTask.subtasks.map(subtask => {
                const label = {inputProps: {"aria-label": subtask.title} }
                return(

                    //material ui component for checkboxes

                    <div className='subtask-wrapper'>
                        <FormControlLabel
                        label= {subtask.title}
                        control={<Checkbox checked={subtask.isCompleted} 
                        size='medium' 
                        sx={{
                            color: {
                                color: context.darkMode ? "#FFFFFF" : "inherit"
                            },
                            "&.Mui-checked":{
                                color: '#635FC7',
                            }
                        }} />}
                        >
                        </FormControlLabel>
                    </div>
                    //material ui checkboxes ends here
                    )
                }
            )}
        <p>Current status</p>
        <select name="column" className='status'>
            {context.boards[context.activeBoard]
            .columns.map(column => <option className='option'>{column.name}</option>)}
        </select>
        </ModalContainer>
    ) 
}


export default Details