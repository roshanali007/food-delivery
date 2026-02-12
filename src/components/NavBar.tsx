import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../redux/hooks";

interface NavBarProps {
  onFoodClick: () => void;
}

const menuItems = ["Home", "Food", "Orders", "Cart", "Profile"];

const NavBar = ({ onFoodClick }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: "#fff700",
          display: "flex",
          justifyContent: { md: "space-between" },
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "space-between", md: "flex-start" },
            gap: { xs: 0, md: 1 },
            width: "100%",
          }}
        >
          <Box sx={{display:'flex'}}>
            <IconButton
              onClick={() => setIsOpen(true)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon fontSize="large" sx={{ color: "#080808" }} />
            </IconButton>

            <DeliveryDiningIcon sx={{ fontSize: 40, color: "#080808" ,padding:'8px' }} />
          </Box>

          <Typography
            variant="h5"
            sx={{ fontFamily: "monster", color: "#080808" }}
          >
            Food Delivery
          </Typography>
        </Box>

        {/* RIGHT SIDE (DESKTOP MENU) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {menuItems.map((item) => {
            if (item === "Cart") {
              return (
                <IconButton
                  key={item}
                  component={Link}
                  to="/cart"
                  sx={{ color: "#080808" }}
                >
                  <Badge
                    badgeContent={cartCount}
                    color="error"
                    invisible={cartCount === 0}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              );
            }

            if (item === "Home") {
              return (
                <Button
                  key={item}
                  onClick={() => navigate("/")}
                  sx={menuButtonStyle}
                >
                  Home
                </Button>
              );
            }

            if (item === "Food") {
              return (
                <Button
                  key={item}
                  onClick={() =>
                    navigate("/", { state: { scrollToFood: true } })
                  }
                  sx={menuButtonStyle}
                >
                  Food
                </Button>
              );
            }


            return (
              <Button key={item} sx={menuButtonStyle}>
                {item}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Sidebar
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onFoodClick={onFoodClick}
      />

    </>
  );
};

const menuButtonStyle = {
  fontFamily: "monster",
  color: "#080808",
  fontSize: 23,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
};

export default NavBar;
