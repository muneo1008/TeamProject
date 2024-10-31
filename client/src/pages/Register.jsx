import {
    Box,
    Button,
    FormControl,  IconButton, InputAdornment,
    InputLabel,
    OutlinedInput, Stack, Toolbar,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Register = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [nickName, setNickName] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleCheckPasswordChange = (event) => {
        setCheckPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password === checkPassword){
            console.log("Logging in with:", { email, password, nickName});
        }else{
            console.log("no")
        }
        //회원가입 요청, 가입완료면 로그인 화면으로 아니면 다시 폼 입력
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowCheckPassword = () => setShowCheckPassword((show) => !show);
    return(
        <>
            <Typography variant="h5" align="center" gutterBottom>
                회원가입
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{width: "100%"}}>
                <Stack spacing={2} sx={{marginLeft:'10px',marginRight:'10px'}}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">이메일</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            label="Email"
                            type='email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="비밀번호"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password-confirm">비밀번호 확인</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-confirm"
                            type={showCheckPassword ? 'text' : 'password'}
                            onChange={handleCheckPasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showCheckPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowCheckPassword}
                                        edge="end"
                                    >
                                        {showCheckPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="비밀번호 확인"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">닉네임</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-nickname"
                            label="Nickname"
                            type='text'
                            value={nickName}
                            onChange={(e)=>{setNickName(e.target.value)}}
                        />
                    </FormControl>


                    <Button type="submit" variant="contained" color="primary">
                        회원가입
                    </Button>
                </Stack>
            </Box>
            <Toolbar/>
        </>


    );
};
export default Register;
