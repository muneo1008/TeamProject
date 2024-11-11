import React, { useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import GavelIcon from '@mui/icons-material/Gavel';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledBottomNavigationAction = styled(BottomNavigationAction)(() => ({
    color: 'gray', // 기본 색상
    '&.Mui-selected': {
        color: '#FE2EF7', // 선택된 상태에서의 색상
    },
}));

const BottomNavBar = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(() => {
        return localStorage.getItem('bottomNavValue') ? parseInt(localStorage.getItem('bottomNavValue')) : 0;
    });

    useEffect(() => {
        switch (location.pathname) {
            case '/home':
                setValue(0);
                break;
            case '/snap':
                setValue(1);
                break;
            case '/color':
                setValue(2);
                break;
            case '/mypage':
                setValue(3);
                break;
            default:
                setValue(4);
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
        <>
            {location.pathname === "/" || location.pathname === "/register" ? null : (
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
                        <StyledBottomNavigationAction
                            component={Link}
                            to="/home"
                            label="홈"
                            icon={<HomeIcon />}
                        />
                        <StyledBottomNavigationAction
                            component={Link}
                            to="/snap"
                            label="스냅"
                            icon={<GavelIcon />}
                        />
                        <StyledBottomNavigationAction
                            component={Link}
                            to="/color"
                            label="컬러진단"
                            icon={<ChatIcon />}
                        />
                        <StyledBottomNavigationAction
                            component={Link}
                            to="/mypage"
                            label="내 정보"
                            icon={<PermIdentityIcon />}
                        />
                    </BottomNavigation>
                </Box>
            )}
        </>
    );
};

export default BottomNavBar;
