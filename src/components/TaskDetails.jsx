import React, { useState } from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'
import Details from './Detalis'
import EditDetails from './EditDetails'
import DeleteTask from './DeleteTaskModal'


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
    
    
    if(edit === true) {
            //returns selected task details
            return <EditDetails context={context} currentTask={filteredTask} setInModal={setInModal} editMenu={editMenu} subtasks={subtasks}/>
        }
        else if(deleteTask === true) {
            //returns selected task deleting menu
            return <DeleteTask context={context} currentTask={filteredTask} setInModal={setInModal} setDeleteTask={setDeleteTask} setEdit={setEdit}/>
        }
        else {  
            //returns edit menu for selected task
            return <Details context={context} currentTask={filteredTask} setInModal={setInModal} setDropDownOpen={setDropDownOpen} setEditMenu={setEditMenu} editMenu={editMenu}  setEdit={setEdit} setDeleteTask={setDeleteTask}/>
        }   
}

export default TaskDetails


//styled components

export const ModalContainer = styled.div`
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