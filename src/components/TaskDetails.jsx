import React from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme } from '@mui/material';
import { purple, pink } from '@mui/material/colors';


function TaskDetails({setInModal}) {

    const context = useKanbanContext()
    const [filteredTask] = context.boards.flatMap(board => 
            board.columns.flatMap(column => column.tasks
            ))
            .filter(task => task.title === context.selectedTask)
    const subtasks = filteredTask.subtasks.filter(task => task.isCompleted).length

  return (
        <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)}>
            <p className='task-name'>
                {filteredTask.title}
            </p>
            <p className='task-description'>
                {filteredTask.description}
            </p>
            <p className='subtasks'>
               Subtasks ({subtasks} of {filteredTask.subtasks.length})
            </p>

{filteredTask.subtasks.map(subtask => {
    const label = {inputProps: {"aria-label": subtask.title} }
    return(
        <div className='subtask-wrapper'>
            <FormControlLabel
            label= {subtask.title}
            control={<Checkbox checked={subtask.isCompleted} 
            size='medium' 
            sx={{
                "&.Mui-checked":{
                    color: '#635FC7',
                }
            }} />}
            >
            </FormControlLabel>
        </div>
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

export default TaskDetails


const ModalContainer = styled.div`
    position: absolute;
    top: calc((100% - 523px)/2);
    left: calc((100% - 480px)/2);
    width: 480px;
    height: 523px;
    padding: 32px;
    background-color: #FFFFFF;
    border-radius: 6px;   

    .task-name{
        width: 387px;
        height: 69px;
        font-family: Plus Jakarta Sans;
        font-size: 18px;
        font-weight: 700;
        line-height: 22.68px;
        text-align: left;
    }

    .task-description{
        font-family: Plus Jakarta Sans;
        font-size: 13px;
        font-weight: 500;
        line-height: 23px;
        text-align: left;
        color: #828FA3;
    }

    .subtasks {
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 700;
        line-height: 15.12px;
        text-align: left;
        color: #828FA3;
    }

    .subtask-wrapper{
        width: 416px;
        min-height: 40px;
        margin-bottom: 8px;
        background-color: #F4F7FD;
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 700;
        line-height: 15.12px;
        text-align: left;
    }

    .completed{
        text-decoration: line-through;
        color:#00011250;
    }
    
    .status{
        width: 416px;
        height: 40px;
        background-color: transparent;
        font-family: Plus Jakarta Sans;
        font-size: 13px;
        font-weight: 500;
        line-height: 23px;
        text-align: left;
        border: 1px solid #828FA340;
        border-radius: 4px;
        appearance: none;
        -webkit-appearance: none;
        -moz-apperance: none;
        background-image: url("./assets/icon-chevron-down.svg");
        background-repeat: no-repeat;
        background-position: 391px 18.5px;  
    }
`