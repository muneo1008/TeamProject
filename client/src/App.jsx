import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import './App.css'
import {Route, Routes} from "react-router-dom";
import {Container, Toolbar} from "@mui/material";
import Camera from "./components/Camera.jsx";
import BottomNavBar from "./components/BottomNavBar.jsx";
import TopAppBar from "./components/TopAppBar.jsx";
import {useState} from "react";


function App() {

  return (
      <Container
          maxWidth="600px"
          sx={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              margin: '0 auto',
              maxWidth:'600px',
              borderColor: '#9a9696',
              boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)',
              // 768px 기준으로 모바일, pc 화면 구분
              '@media (max-width: 768px)': {
                  maxWidth: '100%',
              },
          }}
      >
          <TopAppBar/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/color" element={<Camera/>} />
          </Routes>
          <Toolbar/>
          <BottomNavBar/>

      </Container>
  )
}

export default App
