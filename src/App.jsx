import React, { useEffect, useState } from "react"
import Header from "./components/Header";
import styled from "styled-components";
import Slidebar from "./components/Slidebar";
import KanbanContext from "./Hooks/useContext";
import data from "./data.json"
import Tasks from "./components/Tasks";
import Background from "./components/Background";

const boardsArr = data.boards


function App() {
  const [boards, setBoards] = useState(boardsArr);
  const [activeBoard, setActiveBoard] = useState(0);
  const [sidemenu, setSideMenu] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [modal, setModal] = useState(false)
  const [details, setDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [addNewTask, setAddNewTask] = useState(false);
  const [newBoardMenu, setNewBoardMenu] = useState(false);
  const [editBoardMenu, setEditBoardMenu] = useState(false)
  const [deleteBoardModal, setDeleteBoardModal] = useState(false)
  
  
  const appData = {
    boards: boards,
    activeBoard: activeBoard,
    sideMenu: sidemenu,
    darkMode: darkMode,
    modal: modal,
    details: details,
    selectedTask: selectedTask,
    addNewTask: addNewTask,
    newBoardMenu: newBoardMenu,
    editBoardMenu: editBoardMenu,
    deleteBoardModal: deleteBoardModal,
    setBoards: setBoards,
    setActiveBoard: setActiveBoard,
    setSideMenu: setSideMenu,
    setDarkMode: setDarkMode,
    setModal: setModal,
    setDetails: setDetails,
    setSelectedTask: setSelectedTask,
    setAddNewTask: setAddNewTask,
    setNewBoardMenu: setNewBoardMenu,
    setEditBoardMenu: setEditBoardMenu,
    setDeleteBoardModal: setDeleteBoardModal,
  }

  return (
        <KanbanContext.Provider value={appData}>
          <Container darkMode={darkMode}>
          {modal ? <Background title/> : null}
                <Header />
                <Slidebar />
                <Tasks />
            </Container>
        </KanbanContext.Provider>
  );
}

export default App;


const Container = styled.div`
  position: relative;
  margin: auto;
  max-width: 1440px ;
  height: 1024px;
  background-color: ${(props) => props.darkMode ? "#000112" :"#F4F7FD"};
  overflow: hidden;
`