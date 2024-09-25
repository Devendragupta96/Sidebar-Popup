import { Box, Button } from "@mui/material";
import React from "react";
import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone";
import "../css/SaveSegment.css";

const SaveSegment = ({ onToggle }) => {
  return (
    <>
      <header className="header">
        <KeyboardArrowLeftTwoToneIcon />
        <p>View Audience</p>
      </header>
      <Box className="segment_button">
        <Button variant="outlined" color="success" onClick={onToggle} sx={{textTransform: 'none'}}>
          Save Segment
        </Button>
      </Box>
    </>
  );
};

export default SaveSegment;
