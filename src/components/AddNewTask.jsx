import React from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'

function AddNewTask({setInModal, setDropDownOpen}) {

    const context = useKanbanContext()



  return (
    <ModalWrapper onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)}>
      <h2>Add New Task</h2>
        <div className='input-wrapper'>
            <label htmlFor="">Title</label>
            <input type="text" />
        </div>
        <div className='input-wrapper'>
            <label htmlFor="">Description</label>
            <textarea name="desxcription" id="" cols="30" rows="6"></textarea>
        </div>
        <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
            <label htmlFor="">Subtasks</label>
            <div className='subtask-input'>
                <input type="text" /> <img src="./assets/icon-cross.svg" alt="" />
            </div>
        </div>
        <button class="new-sub-task">+ Add New Subtask</button>
        <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
            <label htmlFor="">Status</label>
            <select name="status" onFocus={() => setDropDownOpen(true)} onBlur={() => setDropDownOpen(false)}>
                {context.boards[context.activeBoard]
                .columns.map(column => <option className='option'>{column.name}</option>)}
            </select>
        </div>
        <button className='create-task'>Create Task</button>
    </ModalWrapper>
  )
}

export default AddNewTask


export const ModalWrapper = styled.div`
    width: 480px;
    padding: 14px 32px 32px;
    background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
    color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    border-radius: 6px;

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


    .subtask-input {
        display: flex;
        gap: 16px;
    }

    .create-task{
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

    .modal-title {
        width: 387px;
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

    input{
        width: 416px;
        border: 1px solid #828FA340;
        height: 40px;
        display: inline-block;
        border-radius: 4px;
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    }

    img {
        margin-top: 13px;
        width: 15px;
        height: 15px;
        display: inline-block;
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    }
    textarea {
        border: 1px solid #828FA340;
        resize: none;
        border-radius: 4px;
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};  
    }

    select {
        height: 40px;
        border: 1px solid #828FA340;
        border-radius: 4px;
        background-color: transparent;
        background-color: ${props => props.darkMode ?"#2B2C37" : "#FFFFFF" };
        color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
    }

`