import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <Box sx={{
      width: "100%",
      padding: 2,
      backgroundColor: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
    }}>
      <Typography variant="body2" color="textSecondary" align="center"> © {new Date().getFullYear()} Todo App. All rights reserved.</Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Made by{" "}
        <Link
          to="https://github.com/huongttt3506"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          huongttt3506
        </Link>
      </Typography>
    </Box>
  )
}

export default Footer