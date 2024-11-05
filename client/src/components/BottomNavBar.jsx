import React, {useEffect} from 'react';
import {BottomNavigation, BottomNavigationAction, Box} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import GavelIcon from '@mui/icons-material/Gavel';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {Link, useLocation} from 'react-router-dom';

const BottomNavBar = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(() => {
        return localStorage.getItem('bottomNavValue') ? parseInt(localStorage.getItem('bottomNavValue')) : 0;
    });
    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setValue(0);
                break;
            case '/login':
                setValue(1);
                break;
            case '/color':
                setValue(2);
                break;
            case '/account':
                setValue(3);
                break;
            default:
                setValue(4); // 기본값 설정
                break;
        }
    }, [location.pathname]);
    useEffect(() => {
        localStorage.setItem('bottomNavValue', value);
    }, [value]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            maxWidth: '600px',
            borderColor: '#9a9696',
            boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)',
            '@media (max-width: 768px)': {
                maxWidth: '100%',
                padding: 0,
            },
        }}>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    '@media (max-width: 768px)': {
                        maxWidth: '100%',
                    },
                }}
            >
                <BottomNavigationAction
                    component={Link}
                    to="/"
                    label="홈"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/login"
                    label="경매"
                    icon={<GavelIcon/>}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/color"
                    label="채팅"
                    icon={<ChatIcon/>}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/account"
                    label="내 정보"
                    icon={<PermIdentityIcon/>}
                />
            </BottomNavigation>
        </Box>


    );
};

export default BottomNavBar;
