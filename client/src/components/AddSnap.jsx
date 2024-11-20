import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

const AddSnap = () => {
    const navigate = useNavigate();
    const [uploadedImages, setUploadedImages] = useState([]); // 여러 이미지 저장
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시 중인 이미지의 인덱스

    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleCameraClick = () => {
        console.log("카메라 아이콘 클릭");
        // 카메라 기능 추가 (추후 구현)
    };

    const handleGalleryClick = () => {
        document.getElementById('imageUploadInput').click();
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const readers = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers)
            .then((images) => {
                setUploadedImages((prev) => [...prev, ...images]);
                if (uploadedImages.length === 0) setCurrentIndex(0);
            })
            .catch((err) => console.error("이미지 업로드 중 오류:", err));
    };

    const handleNext = () => {
        if (currentIndex < uploadedImages.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleDelete = () => {
        if (uploadedImages.length > 0) {
            const updatedImages = uploadedImages.filter((_, index) => index !== currentIndex);
            setUploadedImages(updatedImages);
            if (currentIndex >= updatedImages.length) {
                setCurrentIndex(Math.max(0, updatedImages.length - 1)); // 삭제 후 인덱스 조정
            }
        }
    };

    const handleSendClick = () => {
        console.log("전송 아이콘 클릭");
        // 전송 기능 추가 (추후 구현)
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 20px',
                    backgroundColor: '#fff',
                    zIndex: 1000,
                }}
            >
                <IconButton onClick={handleBack}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    스냅추가
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 20px',
                    backgroundColor: '#fff',
                    marginTop: '14px',
                }}
            >
                <Avatar alt="프로필 이미지" src="" />
                <Box sx={{ marginLeft: '10px' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        이수민
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        3 min ago
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#e0e0e0',
                    margin: '10px',
                    borderRadius: '10px',
                    position: 'relative',
                }}
            >
                {uploadedImages.length > 0 ? (
                    <>
                        <img
                            src={uploadedImages[currentIndex]}
                            alt="Uploaded content"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                        <IconButton
                            onClick={handleDelete}
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: '#fff',
                                '&:hover': { backgroundColor: '#f8d7da' },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        {currentIndex > 0 && (
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    left: '10px',
                                    backgroundColor: '#fff',
                                    '&:hover': { backgroundColor: '#f0f0f0' },
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        {currentIndex < uploadedImages.length - 1 && (
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: '10px',
                                    backgroundColor: '#fff',
                                    '&:hover': { backgroundColor: '#f0f0f0' },
                                }}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        )}
                    </>
                ) : (
                    <Typography color="text.secondary">이미지를 업로드하세요</Typography>
                )}
            </Box>

            <Box
                sx={{
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="내용을 입력하세요..."
                    multiline
                    rows={3}
                />
                <IconButton
                    onClick={handleSendClick}
                    sx={{
                        backgroundColor: '#fff',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    bottom: 175,
                    right: -242,
                }}
            >
                <IconButton
                    onClick={handleCameraClick}
                    sx={{
                        backgroundColor: '#fff',
                        boxShadow: 1,
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    <PhotoCameraIcon />
                </IconButton>
                <IconButton
                    onClick={handleGalleryClick}
                    sx={{
                        backgroundColor: '#fff',
                        boxShadow: 1,
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    <PhotoLibraryIcon />
                </IconButton>
            </Box>

            <input
                id="imageUploadInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                multiple // 여러 이미지 업로드
            />
        </Box>
    );
};

export default AddSnap;
