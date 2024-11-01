import React, { useState } from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


function TaskDetails({setInModal, setDropDownOpen}) {
    const context = useKanbanContext()
    const [filteredTask] = context.boards.flatMap(board => 
            board.columns.flatMap(column => column.tasks
            ))
            .filter(task => task.title === context.selectedTask)
    const subtasks = filteredTask.subtasks.filter(task => task.isCompleted).length
    const [edit, setEdit] = useState(false)
    const [editMenu, setEditMenu] = useState(false)
    const [deleteTask, setDeleteTask] = useState(false)
    
    if(edit === true){
        //returns selected task details
        return <EditDetails context={context} currentTask={filteredTask} setInModal={setInModal} editMenu={editMenu} subtasks={subtasks}/>

    }else if(deleteTask === true){
        //returns selected task deleting menu
        return <DeleteTask context={context} currentTask={filteredTask} setInModal={setInModal} setDeleteTask={setDeleteTask} setEdit={setEdit}/>
    }
    else {  
        //returns edit menu for selected task
        return <Details context={context} currentTask={filteredTask} setInModal={setInModal} setDropDownOpen={setDropDownOpen} setEditMenu={setEditMenu} editMenu={editMenu}  setEdit={setEdit}/>
}
}

export default TaskDetails


//Modal for Task details

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

function EditDetails({context, currentTask, setInModal, setDropDownOpen}) {
    return (
        <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}>
        <h2>Edit Task</h2>
        <div className='input-wrapper'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={currentTask.title}/>                
        </div>
        <div className='input-wrapper'>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="desc" cols="30" rows="5"></textarea>
        </div>
        <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
            <label htmlFor="">Subtasks</label>
            {currentTask.subtasks.map(subtask => { return(
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
            <SelectMenu context={context} columns={context.boards[context.activeBoard].columns} setDropDownOpen={setDropDownOpen}/>
        </div>
    <button className='save-changes'>Save Changes</button>
    </ModalContainer>
    )
}

//delete task modal
function DeleteTask({context, currentTask, setInModal}) {
    return (
            <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}> 
                <h2 className='modal-title'>Delete Task?</h2>
                <p className="warning">Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
                <div className='btn-container'>
                    <button className='btn delete-task'>Delete</button>
                    <button className='btn cancel-delete'>Cancel</button>
                </div>
            </ModalContainer>
    )
}

function EditDropdown({setDeleteTask, setEdit}) {
    return (
    <div className='edit-menu'>
        <p onClick={() => setEdit(true)}>Edit Task</p>
        <p style={{color: "#EA5555"}} onClick={() => setDeleteTask(true)}>Delete Task</p>
    </div>
    )
}


//subtasks 
function SelectMenu({context, columns, setDropDownOpen}){
    return (
            <select name="status" onFocus={() => setDropDownOpen(true)} onBlur={() => setDropDownOpen(false)}>
                {columns.map(column => <option className='option'>{column.name}</option>)}
            </select>
    )
}
//styled components

const ModalContainer = styled.div`
    width: 480px;
    height: auto;
    padding: 14px 32px 32px;
    background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
    color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    border-radius: 6px;   

    .task-name{
        position: relative;
        width: 416px;
        height: 69px;
        font-family: Plus Jakarta Sans;
        font-size: 18px;
        font-weight: 700;
        line-height: 22.68px;
        text-align: left;
    }

    .edit-menu{
        position: absolute;
        left: -96px;
        border-radius: 8px;
        width: 192px;
        height: 94px;
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
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
        background-color: ${props => props.darkMode ?"#2B2C37" :"#F4F7FD"};
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 700;
        line-height: 15.12px;
        text-align: left;
    }

    .completed {
        text-decoration: line-through;
        color:#00011250;
    }
    
    .status {
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

    .menu-button { 
        position: absolute;
        top: 50%;
        right: 0.38px;
        transform: translate(0%, -50%);
        width: 5px;
        display: block;
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
        background-color: ${props => props.darkMode ?"#FFFFFF" : "#635FC71A" };
        color: ${props => props.darkMode ? "#635FC7" : "#000000"};
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

    .save-changes {
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

    .task-title{
        width: 387px;
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    }
    
    .modal-title {
        margin: 18px 0 24px;
        font-family: Plus Jakarta Sans;
        font-size: 18px;
        font-weight: 700;
        line-height: 22.68px;
        text-align: left;
        color: #EA5555;
    }

    .warning{
        font-family: Plus Jakarta Sans;
        font-size: 13px;
        font-weight: 500;
        line-height: 23px;
        text-align: left;
        color: #828FA3;
    }

    .btn-container{
        width: 416px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin: 24px 0 8px;
    }
    .btn{
        width: 200px;
        height: 40px;
        border-radius: 20px;
        border: none;
        font-family: Plus Jakarta Sans;
        font-size: 13px;
        font-weight: 700;
        line-height: 23px;
        text-align: center;
    }

    .delete-task{
        background-color: #EA5555;
        color: #FFFFFF;
    }

    .cancel-delete {
        background-color: ${props => props.darkMode ? "#FFFFFF" : "#635FC71A"};
        color: #635FC7;
    }

    input {
        width: 416px;
        border: 1px solid #828FA340;
        height: 40px;
        display: inline-block;
        border-radius: 4px;
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    }

    select {
        height: 40px;
        border: 1px solid #828FA340;
        border-radius: 4px;
        background-color: transparent;
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
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
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    }
`