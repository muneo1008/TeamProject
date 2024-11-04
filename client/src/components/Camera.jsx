import React, { useEffect, useRef, useState } from 'react';
import { Button, Box, Snackbar } from '@mui/material';

const Camera = () => {
    const [error, setError] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [stream, setStream] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [showCaptureButton, setShowCaptureButton] = useState(true);
    const videoRef = useRef(null); // 비디오 참조 추가

    async function openCamera() {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream; // ref를 사용하여 비디오 소스 설정
            }
            setStream(mediaStream);
        } catch (err) {
            console.error("카메라 접근 오류:", err);
            handleCameraError(err);
        }
    }

    function handleCameraError(err) {
        let errorMessage = "카메라를 열 수 없습니다. 권한을 확인해주세요.";
        if (err.name === "NotAllowedError") {
            errorMessage = "카메라 권한이 허용되지 않았습니다.";
        } else if (err.name === "NotFoundError") {
            errorMessage = "카메라 장치를 찾을 수 없습니다.";
        } else if (err.name === "NotReadableError") {
            errorMessage = "카메라에 접근할 수 없습니다. 다른 애플리케이션에서 사용 중일 수 있습니다.";
        }
        setError(errorMessage);
        setSnackbarOpen(true);
    }

    function capturePhoto() {
        const canvas = document.createElement('canvas');
        const video = videoRef.current; // ref에서 비디오 요소 가져오기
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');

        // 좌우 반전 캡처
        context.scale(-1, 1);
        context.drawImage(video, -video.videoWidth, 0);

        // 캔버스를 Blob 형태로 변환 후 이미지 URL 생성
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            console.log(url);
            setPhotoUrl(url);

            // 스트림 중지하여 카메라 끄기
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
            setShowCaptureButton(false);
        });
    }

    function resetCamera() {
        setPhotoUrl(null);
        openCamera();
        setShowCaptureButton(true);
    }

    useEffect(() => {
        openCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        };
    }, []);

    return (
        <Box sx={{ textAlign: 'center', position: 'relative' }}>
            {error && (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    message={error}
                />
            )}

            {!photoUrl && (
                <video
                    ref={videoRef} // ref를 사용하여 비디오 요소 참조
                    autoPlay
                    playsInline
                    style={{ width: '100%', transform: 'scaleX(-1)', objectFit: 'cover', height: '85vh' }}
                />
            )}

            {showCaptureButton && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={capturePhoto}
                    sx={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    사진 촬영
                </Button>
            )}

            {photoUrl && (
                <Box sx={{ position: 'relative' }}>
                    <img src={photoUrl} alt="촬영된 사진" style={{ width: '100%', objectFit: 'cover', height: '60vh' }} />
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={resetCamera}
                        sx={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        다시 찍기
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Camera;
