import {
    Box, Button,
    FormControl, IconButton, InputAdornment,
    InputLabel, MenuItem,
    OutlinedInput, Select, Stack, TextField, Toolbar,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {registerUser, sendCode, verifyCode} from "../api.jsx";
import BasicBtn from "../components/BasicBtn.jsx";

const Register = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(null);
    const [age, setAge] = useState(0);
    const [emailVaild, setEmailVaild] = useState(false);

    const navigate = useNavigate();

    const handleEmailVerification = async (e)=>{
        e.preventDefault();
        try {
            const result = await sendCode(email);
            alert(result.message);
        }catch(err){
            console.log(err);
        }
    }
    const handleVerifyCode = async (e)=> {
        e.preventDefault();
        try{
            const result = await verifyCode(email, verificationCode);
            setEmailVaild(true);
            alert(result.message);
        }catch(err){
            console.log(err);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if(emailVaild && (password === checkPassword)){
                const result = await registerUser(email, password, nickName,
                    gender, age, location.latitude,location.longitude);
                console.log('회원가입 성공: ',result);
                navigate('/');
            }else{
                alert('이메일 인증이 필요합니다.')
            }
        }catch (err){
            console.log('회원가입 실패: ',err);
            console.log({email,password,nickName,age,gender});
            console.log(location.latitude)
            console.log(location.longitude)
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("지원하지 않는 기능");
        }
    }, []);
    return(
        <>
            <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 8 }}>
                회원가입
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                <Stack spacing={2} sx={{ marginLeft: '10px', marginRight: '10px' }}>
                    {/* Email input field */}
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-email">이메일</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </FormControl>
                    {/* Button to send email verification code */}
                    <Button
                        variant="contained"
                        onClick={handleEmailVerification}
                        sx={{ marginTop: 1 }}
                    >
                        인증 코드 보내기
                    </Button>

                    {/* Verification Code input and button */}
                    <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                        <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                            <OutlinedInput
                                id="outlined-adornment-verification-code"
                                label="인증 코드"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={handleVerifyCode}
                            sx={{ marginTop: 1 }}
                        >
                            이메일 인증하기
                        </Button>
                    </Stack>

                    {/* Password input */}
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => { setShowPassword(!showPassword) }}
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
                            onChange={(e) => { setCheckPassword(e.target.value) }}
                            value={checkPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showCheckPassword ? 'hide the password' : 'display the password'}
                                        onClick={() => { setShowCheckPassword(!showCheckPassword) }}
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
                        <InputLabel htmlFor="outlined-adornment-nickname">닉네임</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-nickname"
                            label="Nickname"
                            type="text"
                            value={nickName}
                            onChange={(e) => { setNickName(e.target.value) }}
                        />
                    </FormControl>

                    <TextField
                        label="나이"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="gender-label">성별</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender-select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            label="성별"
                        >
                            <MenuItem value="male">남성</MenuItem>
                            <MenuItem value="female">여성</MenuItem>
                        </Select>
                    </FormControl>

                    <BasicBtn text="회원가입" bgColor="black" textColor="white" />
                </Stack>
            </Box>
            <Toolbar />

        </>


    );
};
export default Register;
