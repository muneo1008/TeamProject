import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
            axios.post(`http://localhost:8080/api/member/kakao`, { code }, { WithCredentials: true })
                .then(res => {
                    const { isMember, socialId, provider, email } = res.data;
                    if (isMember) {
                        navigate('/home');
                    } else {
                        navigate('/signupex', { state: { socialId, provider, email } });
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    navigate('/');
                });
        }
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
};

export default KakaoHandler;
