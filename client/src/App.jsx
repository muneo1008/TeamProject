import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import MyPage from './pages/MyPage.jsx';
import Snap from "./pages/Snap.jsx";
import FashionTest from "./pages/FashionTest.jsx";
import SingUpEx from "./pages/SingUpEx.jsx";
import KakaoHandler from "./components/KakaoHandler.jsx";
import TopAppBar from "./components/TopAppBar.jsx";
import BottomNavBar from "./components/BottomNavBar.jsx";
import './App.css';

function App() {
    const isDesktop = useMediaQuery('(min-width:768px)');
    function ScrollToTop() {
        const location = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [location]);

        return null;
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',

                padding: 0,
                margin: 0,
                bgcolor: '#f0f0f0',
            }}
        >
            <Box
                sx={{
                    width: isDesktop ? '600px' : '100%',
                    boxShadow: isDesktop ? 3 : 0,
                    bgcolor: '#fff',
                    padding: 0,
                    margin: 0,
                    minHeight:'100vh',
                    alignItems: 'center',
                }}
            >
                <ScrollToTop />
                <TopAppBar />
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/auth/kakao" element={<KakaoHandler />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/snap" element={<Snap />} />
                    <Route path='/fashion-test' element={<FashionTest />} />
                    <Route path="/signupex" element={<SingUpEx />} />
                </Routes>
                <Toolbar />
                <BottomNavBar />
            </Box>
        </Box>
    );
}

export default App;
