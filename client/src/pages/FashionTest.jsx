import { Box, Typography } from "@mui/material";
import findPColor from '../assets/colorTest/findPColor.png';
import PersonalColor from "../components/PersonalColor.jsx";
import { useState } from "react";


const FashionTest = () => {
    const [selectTest, setSelectTest] = useState(0);

    const goPersonColor = () => {
        setSelectTest(1);
    }

    return (
        <Box sx={{
            width: '100%',
            height: '87.5vh',
            bgcolor: '#E6E6FA'
        }}>
            {selectTest === 0 && (
                <>
                    <Typography
                        variant="h4"
                        color="textSecondary"
                        sx={{
                            fontWeight:'bold',
                            textAlign: 'center',
                            pt: 4,
                        }}>
                        패션 테스트
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                            mb:13,
                            textAlign: 'center',
                        }}>
                        여러분의 패션을 테스트 해보세요!
                    </Typography>

                    <Box sx={{
                        bgcolor: '#E6E6FA',
                        borderTopLeftRadius: '100px',
                        boxShadow: '0px -5px 2px rgba(0,0,0,0.1)',
                        pt: 7,
                        pl: 5,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography variant="h5"
                                    sx={{ fontWeight: 'bold' }}>
                            #퍼스널 컬러
                        </Typography>
                        <Box
                            component="img"
                            src={findPColor}
                            sx={{ width: '30%', borderRadius: '16px', mt: 1 }}
                            onClick={goPersonColor}
                        />
                    </Box>
                </>
            )}
            {selectTest === 1 && <PersonalColor/>}
        </Box>
    );
}

export default FashionTest;
