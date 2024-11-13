import {
    Box,
    FormControl,
    InputLabel, MenuItem,
    OutlinedInput, Select, Stack, TextField, Toolbar,
    Typography
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import {registerExUser} from "../api.jsx";
import BasicBtn from "../components/BasicBtn.jsx";

const SignUpEx = () =>{
    const locations = useLocation();
    const { socialId, provider, email }= locations.state;
    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [age, setAge] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            {
                const result = await registerExUser(email, nickName,
                    gender, age, location.latitude,location.longitude,socialId, provider);
                alert("회원가입 성공");
                console.log('회원가입 성공: ',result);
                navigate('/');
            }
        }catch (err){
            console.log('회원가입 실패: ',err);
            console.log({email,nickName,age,gender});
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
export default SignUpEx;
