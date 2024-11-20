import {Button} from "@mui/material";

const BasicBtn = ({text, bgColor, textColor}) => {
    return (
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2,
            color: textColor,
            backgroundColor: bgColor,
            fontWeight: "bold",
            borderRadius: '12px'}}>
            {text}
        </Button>
    );
};
export default BasicBtn
