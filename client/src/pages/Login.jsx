
import {useEffect, useState} from 'react';
import {Box, TextField, Button, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Logging in with:", { email, password });
        //로그인 요청
    };
    return (
        <>
            <Typography variant="h5" align="center" gutterBottom>
                로그인
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button variant="text" onClick={() => navigate('/register')}>
                        계정이 없으신가요?
                    </Button>
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    로그인
                </Button>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    카카오로 로그인
                </Button>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    구글로 로그인
                </Button>
            </Box>
        </>

    );
};

export default Login;
