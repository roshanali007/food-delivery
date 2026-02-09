import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

import Sidebar from "./Sidebar";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <Box sx={{ px: 2, py: 1.5, backgroundColor: "#fff700" }}>
        <Box sx={{ display: "flex", alignItems: "center" ,justifyContent:'space-between'}}>
          <Box>
            <IconButton onClick={openSidebar}>
                <MenuIcon fontSize="large" sx={{color: "#080808"}}/>
            </IconButton>

            <DeliveryDiningIcon sx={{ fontSize: 40, color: "#080808" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{ fontFamily: "monster", color: "#080808" }}
          >
            Food Delivery
          </Typography>

        </Box>
      </Box>

      <Sidebar open={isOpen} onClose={closeSidebar} />
    </>
  );
};

export default NavBar;
