import React, { useState } from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'

function Slidebar() {
    const context = useKanbanContext()

    function handleClick(index) {
        context.setActiveBoard(index)
    }
  return (
    <SideMenu sideMenu = {context.sideMenu} darkMode={context.darkMode}>
        <LogoContainer>
        <img src={context.darkMode ? "./assets/logo-light.svg" : "./assets/logo-dark.svg"} alt="Kanban Logo" />
        </LogoContainer>
        <BoardsContainer>
            <p>
                ALL BOARDS ({context.boards.length})
            </p> 
            <div>
                {context.boards.map((board, index)=> {
                    return (
                    index == context.activeBoard
                    ?
                    <p className='board-name active' onClick={() => handleClick(index)}>{board.name}</p>
                    :
                    <p className='board-name' onClick={() => handleClick(index)}>{board.name}</p>
                    )
                }
                )}
                <p className='board-name' style={{color: "#635fc7"}} onClick={() => {
                    context.setModal(true);
                    context.setNewBoardMenu(true);
                    context.setDetails(false);
                    context.setAddNewTask(false);
                }}>+ Create New Board</p>
            </div>
        <LightModeSwich darkMode={context.darkMode}>
            <img src="./assets/icon-light-theme.svg" alt="Light theme" />
            <div style={{display: "inline-block"}}>
                <input id="toogle-dark-mode" type="checkbox" className='swich-slider' />
                <label htmlFor="toogle-dark-mode" className='slider' onClick={() => 
                context.setDarkMode(curr => !curr)
                }>
                    <div className="circle"></div>
                </label>
            </div>
            <img src="./assets/icon-dark-theme.svg" alt="dark Theme" />
        </LightModeSwich>
        <SidebarShowHide 
        sideMenu={context.sideMenu}
        onClick={() => {context.setSideMenu(curr => !curr)}}>
            <img src={context.sideMenu ? "./assets/icon-hide-sidebar.svg" : "./assets/icon-show-sidebar.svg"} alt="" />{context.sideMenu ? <span>Hide Sidebar</span> : null}
        </SidebarShowHide>
        </BoardsContainer>
    </SideMenu>
  )
}

export default Slidebar


const SideMenu = styled.div`
    position: absolute;
    top: 0;
    left: ${(props) => props.sideMenu ? 'clac((100vw -1400px)/2)' : "-300px"};
    width: 300px;
    height: 1024px;
    display: flex;
    flex-direction: column;
    background-color:  ${(props) => props.darkMode ? "#2B2C37" : "#FFFFFF"};
    color:  ${(props) => props.darkMode ? "#FFFFFF" : "#828FA3"};
    z-index: 5;
`

const LogoContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 33px 0 0 34px;
`

const BoardsContainer = styled.div`
    width: 276px;
    height: 880px;
    font-family: Plus Jakarta Sans;
    font-size: 12px;
    font-weight: 700;
    line-height: 15.12px;
    letter-spacing: 2.4000000953674316px;
    text-align: left;

    p {
        margin: 54px 32px 19px;
    }

    .board-name{
        width: 100%;
        height: 48px;
        margin: 0px;
        padding: 14px 32px 15px;
        font-family: Plus Jakarta Sans;
        font-size: 15px;
        font-weight: 700;
        line-height: 18.9px;
        text-align: left;
        cursor: pointer;
    }

    .active{
        background-color: #635fc7;
        border-top-right-radius: 24px ;
        border-bottom-right-radius: 24px ;
        color: #FFFFFF;
    }
`

const LightModeSwich = styled.div`
    position: absolute;
    left: 24px;
    bottom: 88px;
    width: 251px;
    height: 48px;
    padding: 14px;
    background-color: ${(props) => props.darkMode ? "#20212C" : "#FFFFFF"};
    text-align: center;

    input.swich-slider{
        display: none;
    }

    .slider{
        width: 40px;
        height: 20px;
        display: inline-block;
        margin: 0 24px;
        background-color: #635FC7;
        border-radius: 24px;
        padding: 3px;
        position: relative;
        cursor: pointer;
    }

    .circle{
        position: absolute;
        top: 3px;
        right: ${(props) => props.darkMode ? "3px" : "none"};
        left: ${(props) => props.darkMode ? "none" : "3px"};
        width: 14px;
        height: 14px;
        background-color: #FFF;
        border-radius: 50%;
    }
   
`

const SidebarShowHide = styled.div`
    position: absolute;
    left: ${(props) => props.sideMenu ? "0px" : "300px"};
    bottom: 32px;
    width: ${(props) => props.sideMenu ? "278px" : "56px"};
    height: 48px;
    padding: ${(props) => props.sideMenu ? "0 0 0 32px" : "0 0 0 18px"};
    background-color: ${(props) => props.sideMenu ? "transparent" : "#635FC7"};
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    color: #828FA3;
    display: flex;
    align-items: center;

    img{
        margin: 0 15px 0 0
    }

    span{
        height: auto;
        display: inline-block;
        font-family: Plus Jakarta Sans;
        font-size: 15px;
        font-weight: 700;
        line-height: 18.9px;
        text-align: left;
    }
`