import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import './App.css'
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import {Container, Toolbar} from "@mui/material";
import Camera from "./components/Camera.jsx";
import BottomNavBar from "./components/BottomNavBar.jsx";
import TopAppBar from "./components/TopAppBar.jsx";
import {useSelector, useDispatch} from "react-redux";
import MyPage from './pages/MyPage.jsx';
import Snap from "./pages/Snap.jsx";
import {useEffect, useState} from "react";
import {userInfo} from './api.jsx';
import {SetNickName, SetEmail, isLogin, setLatitude,setLongitude} from "./store.jsx";
import SnapPage from './pages/SnapPage.jsx';
import SingUpEx from "./pages/SingUpEx.jsx";


function App() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isValid = async ()=>{
        try {
            const result = await userInfo();
            console.log('토큰 정보 유효',result);
            dispatch(SetNickName(result.nickname));
            dispatch(SetEmail(result.email));
            dispatch(setLatitude(result.latitude));
            dispatch(setLongitude(result.longitude));
            dispatch(isLogin(true));
            navigate('/home');
        }catch (error){
            console.log('내 정보 불러오기 실패:', error);
            dispatch(isLogin(false));
            navigate('/');
        }
    }

    useEffect(() => {
        isValid();
    },[isLogin]);

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
          <Toolbar/>

              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<Home/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/color" element={<Camera/>} />
                  <Route path="/mypage" element={<MyPage/>}/>
                  <Route path="/snap" element={<Snap/>}/>
                  <Route path="/snap/:id" element={<SnapPage/>}/>
              </Routes>
          <Toolbar/>
          <BottomNavBar/>

      </Container>
  )
}

export default App
