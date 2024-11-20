import {Avatar, Box, Button, Typography} from "@mui/material";
import Typewriter from 'typewriter-effect';

const PersonalColorResult = (props) => {
    return(
        <Box
            sx={{
                width: '100%',
                minHeight: '87vh',
                bgcolor: '#E6E6FA',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 2,
            }}
        >
            <Typography variant="h4" sx={{ mb: 3 }}>
                퍼스널 컬러 결과
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Avatar
                    src="userProfileImageURL"
                    sx={{ width: 200, height: 200, mb: 1 }}
                />
                <Typography variant="h6">닉네임</Typography>
            </Box>
            <Typography variant="h6">
                <Typewriter
                    options={{
                        strings: [`퍼스널 컬러는 <strong>${props.personalColor}</strong>입니다!`],
                        autoStart: true,
                        loop: false,
                        deleteSpeed: Infinity,
                        delay:80,
                    }}
                />
            </Typography>

            <Typography variant="body1" sx={{ mb: 3,mt:1, textAlign: 'center', px: 2 }}>
                <strong>{props.personalColor}</strong> 컬러는 당신의 피부 톤을 돋보이게 하고, 자신감 넘치는 외모를 연출할 수 있는 색상입니다.
                일상에서 이 컬러를 활용한 의상과 메이크업을 시도해 보세요!
            </Typography>

            <Button
                variant="contained"
                onClick={() => {
                    props.setPersonalColor(null);
                    props.setImage(null);
                }}
            >
                다시 진단하기
            </Button>
        </Box>
    );

}
export default PersonalColorResult;
