import React, { useState } from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'



function Header() {
    const context = useKanbanContext()
    const [editBoardMenu, setEditBoardMenu] = useState(false)


  return (
    <Container sideMenu={context.sideMenu} darkMode={context.darkMode}>
        <LogoContainer darkMode={context.darkMode}>
            <img src={context.darkMode ? "./assets/logo-light.svg" : "./assets/logo-dark.svg"} alt="Kanban Logo" />
        </LogoContainer> 
        <h2>{context.boards[context.activeBoard].name}</h2>
        <div className="btn-box">
            <AddButton onClick={() => {
                context.setModal(true)
                context.setAddNewTask(true)
                context.setDetails(false)
                context.setNewBoardMenu(false)
                }}>+ Add New Task</AddButton>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg" onClick={() => setEditBoardMenu(curr => !curr)}><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                {
                editBoardMenu && 
                <div className='edit-board-menu'>
                    <p onClick={() => {
                        context.setModal(true)
                        context.setDetails(false);
                        context.setAddNewTask(false);
                        context.setNewBoardMenu(false);
                        context.setEditBoardMenu(true);
                        context.setDeleteBoardModal(false);
                        setEditBoardMenu(false)
                        }}>Edit Board</p>
                    <p onClick={() => {
                        context.setModal(true)
                        context.setDetails(false);
                        context.setAddNewTask(false);
                        context.setNewBoardMenu(false);
                        context.setEditBoardMenu(true);
                        context.setDeleteBoardModal(true);
                        setEditBoardMenu(false)
   
                    }}
                        style={{color: "#EA5555"}} 
                        >Delete Board</p>
                </div>
                }
        </div>
    </Container>
  )
}

export default Header

const Container = styled.div`
    position: relative;
    width: 1440px;
    height: 97px;
    background-color: ${props => props.darkMode ? "#2B2C37" : "#FFFFFF"};
    display: grid;
    box-sizing: border-box;
    border-bottom: ${props => props.darkMode ? "1px solid #3E3F4E" : "1px solid #E4EBFA"};
    display: grid;
    grid-template-columns: ${(props) => props.sideMenu ?"300px 914px 226px" :"209px 1005px 226px"};
    color: ${props => props.darkMode ? "#FFFFFF" : "#000000"};
   
    .btn-box{
        padding: 20px 32.38px 0 0;
        display: flex;
        column-gap: 24px;
    }

    .edit-board-menu {
        position: absolute;
        top: 90px;
        right: 24px;
        width: 192px;
        height: 94px;
        background-color:#FFFFFF;
        color: #828FA3;
        padding: 0 16px;
        border-radius: 8px;
        z-index: 5;
    }
    
    h2 {
        margin: 29px 0 0 32px;
        font-family: Plus Jakarta Sans;
        font-size: 24px;
        font-weight: 700;
        line-height: 30.24px;
        text-align: left;
    }

    svg {
        margin-top: 14px;
    }
`



const LogoContainer = styled.div`
    padding: 35px 0 0 24px;
    width: 209px;
    height: 100%;
    border-right: ${(props) => props.darkMode ? "1px solid #3E3F4E" : "1px solid #E4EBFA"};
`
const AddButton = styled.button`
    width: 164px;
    height: 48px;
    background: #635FC7;
    border-radius: 24px;
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    color: #FFFFFF;
    border: none;
`