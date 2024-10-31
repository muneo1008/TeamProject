import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import './App.css'
import {Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";
import BottomNavBar from "./components/BottomNavBar.jsx";
import TopAppBar from "./components/TopAppBar.jsx";


function App() {

  return (
      <Container
          maxWidth="600px"
          sx={{
              padding: 2,
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop:0,
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
          </Routes>
          <BottomNavBar/>

      </Container>
  )
}

export default App
