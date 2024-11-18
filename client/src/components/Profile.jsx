import {Avatar, Box, IconButton, Paper, Stack, Typography} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

const Profile = () => {
    return (
            <Box position="relative" display="flex" alignItems="center" justifyContent="center" p={5}>
                <IconButton
                    aria-label="settings"
                    sx={{ position: 'absolute', top: 9, right: 0 }}
                >
                    <SettingsIcon />
                </IconButton>
                <Stack alignItems="center" spacing={1} mr={2}>
                    <Avatar
                        alt="User"
                        src="/src/images/image.jpg"
                        sx={{ width: 100, height: 100 }}
                    />
                    <Typography variant="body2" fontWeight="bold" sx={{fontSize:'1.2rem'}} >
                        이수민
                    </Typography>
                </Stack>

                <Paper elevation={3} sx={{ px: 2, py: 1, borderRadius: 2, mx: 1, backgroundColor: 'beige' }}>
                    <Typography variant="caption" display="block" fontWeight="bold" color="textSecondary" sx={{fontSize:'0.7rem'}}>
                        퍼스널컬러
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{fontSize:'1.1rem'}}>
                        가을 뮤트 웜
                    </Typography>
                </Paper>

                <Stack alignItems="center" spacing={0.5} mx={1}>
                    <Typography variant="caption" color="textSecondary" fontWeight="bold" sx={{position:'absolute',top:60, left: 320}}>
                        게시물
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <Typography variant="h2" fontWeight="medium" >
                            16
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="textSecondary" ml={0.5}
                                    sx={{ position: 'absolute', bottom: 80, right: 30 }}>
                            개
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
    );
};
export default Profile;
