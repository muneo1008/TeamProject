import { useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardMedia,
    IconButton,
    Typography,
    Fab,
    useMediaQuery,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { formatDistanceToNow } from "date-fns";
import {useNavigate} from "react-router-dom";

const Snap = () => {
    const isDesktop = useMediaQuery("(min-width:768px)");
    const navigate = useNavigate();

    // 임시 데이터
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: { name: "seon12_", profileImage: "https://via.placeholder.com/150" },
            image: "https://via.placeholder.com/400",
            createdAt: "2024-11-18T09:00:00Z",
            isLiked: false,
        },
        {
            id: 2,
            user: { name: "seon12_", profileImage: "https://via.placeholder.com/150" },
            image: "https://via.placeholder.com/400",
            createdAt: "2024-11-17T12:00:00Z",
            isLiked: false,
        },
        {
            id: 3,
            user: { name: "seon12_", profileImage: "https://via.placeholder.com/150" },
            image: "https://via.placeholder.com/400",
            createdAt: "2024-11-17T12:00:00Z",
            isLiked: false,
        },
    ]);

    const handleLikeToggle = (e,id) => {
        e.preventDefault();
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === id ? { ...post, isLiked: !post.isLiked } : post
            )
        );
    };

    return (
        <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden",pb:7 }}>
            {posts.map((post) => (
                <Card key={post.id} sx={{ position: "relative", mb: 1 }} onClick={()=>navigate(`/snap/${post.id}`)}>

                    <CardMedia
                        component="img"
                        image={post.image}
                        sx={{ height: 400, objectFit: "cover" }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        <Avatar
                            src={post.user.profileImage}
                            alt={post.user.name}
                            sx={{ width: 40, height: 40, marginRight: 1 }}
                        />
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                {post.user.name}
                            </Typography>
                            <Typography variant="caption">
                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                            display: "flex",
                            gap: 1,
                            color: "white",
                            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        <IconButton
                            sx={{ color: post.isLiked ? "red" : "white" }}
                            onClick={(e) => handleLikeToggle(e, post.id)}
                        >
                            {post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Box>
                </Card>
            ))}


            <Fab
                aria-label="add"
                sx={{
                    position: "fixed",
                    bottom: 90,
                    right: isDesktop ? "calc(50% - 290px)" : 16,
                    bgcolor:"#e6e6fa"
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default Snap;
