import { useRef, useState } from 'react';
import {Box, Button, Typography, Backdrop, CircularProgress, Avatar} from '@mui/material';
import Webcam from 'react-webcam';
import { uploadImage } from '../apiFlask.jsx';
import PersonalColorResult from "./PersonalColorResult.jsx";
const PersonalColor = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [personalColor, setPersonalColor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleCamera = () => {
        setIsCameraOpen(!isCameraOpen);
    };

    const captureImage = (webcamRef) => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setIsCameraOpen(false);
    };

    const checkPersonalColor = async () => {
        if (image === null) {
            alert("이미지를 업로드 해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            console.log('진단 받기 버튼 누름');
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            const result = await uploadImage(file);
            console.log(result);
            setPersonalColor(result.personal_color);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const webcamRef = useRef(null);

    if (personalColor) {
        // 퍼스널 컬러 결과 화면
        return (
            <PersonalColorResult personalColor={personalColor} setImage={setImage} setPersonalColor={setPersonalColor} />
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '87vh',
                bgcolor: '#E6E6FA',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                pt: 2,
            }}
        >
            {!isCameraOpen && (
                <>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        퍼스널 컬러 진단
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                        본인 사진을 사용해 퍼스널 컬러 진단을 받아보세요!
                    </Typography>
                </>
            )}

            {!isCameraOpen && !image && (
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        height: 250,
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="h6">이미지를 업로드하세요!</Typography>
                    <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                        이미지 업로드
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                        />
                    </Button>
                </Box>
            )}

            {image && (
                <Box sx={{ mb: 2 }}>
                    <img
                        src={image}
                        alt="업로드된 이미지"
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            borderRadius: '16px',
                            transform: 'scaleX(-1)',
                        }}
                    />
                </Box>
            )}

            {!isCameraOpen && (
                <>
                    <Button variant="contained" onClick={toggleCamera} sx={{ mb: 2 }}>
                        사진 찍기
                    </Button>
                    <Button variant="contained" onClick={checkPersonalColor} sx={{ mb: 2 }}>
                        퍼스널 컬러 진단 받기
                    </Button>
                </>
            )}

            {isCameraOpen && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '88vh',
                        backgroundColor: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                    }}
                >
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        height="100%"
                        videoConstraints={{
                            facingMode: 'environment',
                        }}
                        style={{
                            transform: 'scaleX(-1)',
                            objectFit: 'cover',
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => captureImage(webcamRef)}
                        sx={{
                            position: 'absolute',
                            bottom: 20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        사진 찍기
                    </Button>
                </Box>
            )}

            <Backdrop
                open={isLoading}
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default PersonalColor;
