import React, { useState } from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme } from '@mui/material';
import { purple, pink } from '@mui/material/colors';


function TaskDetails({setInModal, setDropDownOpen}) {

    const context = useKanbanContext()
    const [filteredTask] = context.boards.flatMap(board => 
            board.columns.flatMap(column => column.tasks
            ))
            .filter(task => task.title === context.selectedTask)
    const subtasks = filteredTask.subtasks.filter(task => task.isCompleted).length
    const [edit, setEdit] = useState(false)
    const [editMenu, setEditMenu] = useState(false)
 
    
    if(edit === true){
    return (
        <ModalContainer>
            <h2>Edit Task</h2>
            <div className='input-wrapper'>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={filteredTask.title}/>                
            </div>
            <div className='input-wrapper'>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="desc" cols="30" rows="5"></textarea>
            </div>
            <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
                <label htmlFor="">Subtasks</label>
                {filteredTask.subtasks.map(subtask => { return(
                    <div className='subtask-input'>
                        <input type="text" value={subtask.title} /> <img src="./assets/icon-cross.svg" alt="cllosing cross" />
                    </div>
                        )
                    }
                )}
            </div>
            <button class="new-sub-task">+ Add New Subtask</button>
            <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
                <label htmlFor="">Status</label>
                <select name="status" onFocus={() => setDropDownOpen(true)} onBlur={() => setDropDownOpen(false)}>
                    {context.boards[context.activeBoard]
                .columns.map(column => <option className='option'>{column.name}</option>)}
                </select>
            </div>
        <button className='save-changes'>Save Changes</button>
        </ModalContainer>
        )
    }
    else {  
    return (
        <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)}>
            <div className='task-name'>
                <p>
                    <span>
                        {filteredTask.title}
                    </span>
                </p>
                <span onClick={() => setEditMenu(curr => !curr)} className='menu-button'>
                        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                </span>
                {editMenu && 
                <div className='edit-menu'>
                    <p onClick={() => setEdit(true)}>Edit Task</p>
                    <p style={{color: "#EA5555"}}>Delete Task</p>
                </div>
                }   
            </div>
          

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
}

export default TaskDetails


const ModalContainer = styled.div`
    position: absolute;
    top: calc((100% - 523px)/2);
    left: calc((100% - 480px)/2);
    width: 480px;
    height: auto;
    padding: 32px;
    background-color: #FFFFFF;
    border-radius: 6px;   

    .task-name{
        width: 387px;
        height: 69px;
        display: inline-block;
        font-family: Plus Jakarta Sans;
        font-size: 18px;
        font-weight: 700;
        line-height: 22.68px;
        text-align: left;
    }

    .edit-menu{
        position: absolute;
        top: 98px;
        left: 353px;
        border-radius: 8px;
        width: 192px;
        height: 94px;
        background-color: #FFFFFF;
        font-family: Plus Jakarta Sans;
        font-size: 13px;
        font-weight: 500;
        line-height: 23px;
        text-align: left;
        padding: 16px;
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

    .menu-button{
        display: inline-block;
        position: absolute;
        top: 56px;
        right: 32.38px;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 700;
        line-height: 15.12px;
        text-align: left;
        color: #828FA3;
    }

    .new-sub-task {
        width: 100%;
        height: 40px;
        margin-bottom: 24px;
        background-color: #635FC71A;
        color: #635FC7;
        font-family: Plus Jakarta Sans;
        font-size: 13px;
        font-weight: 700;
        line-height: 23px;
        text-align: center;
        border: none;
        border-radius: 24px;
    }

    .subtask-input {
        display: flex;
        gap: 16px;
    }

    .save-changes{
        width: 100%;
        height: 40px;
        background-color: #635FC7;
        color: #FFFFFF;
        font-family: Plus Jakarta Sans;
        font-size: 13px;
        font-weight: 700;
        line-height: 23px;
        text-align: center;
        border: none;
        border-radius: 24px;
    }

    input {
        width: 416px;
        border: 1px solid #828FA340;
        height: 40px;
        display: inline-block;
        border-radius: 4px;
    }

    select {
        height: 40px;
        border: 1px solid #828FA340;
        border-radius: 4px;
        background-color: transparent;
    }

    img {
        margin-top: 13px;
        width: 15px;
        height: 15px;
        display: inline-block;
    }

    textarea {
        border: 1px solid #828FA340;
        resize: none;
        border-radius: 4px;
    }
`

const EditTask = styled.div`
    
`