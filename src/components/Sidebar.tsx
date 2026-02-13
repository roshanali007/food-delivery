import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onFoodClick: () => void;
};

const menuItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Menu", icon: <RestaurantMenuIcon /> },
  { label: "Orders", icon: <ReceiptLongIcon /> },
  { label: "Cart", icon: <ShoppingCartIcon /> },
  { label: "Profile", icon: <PersonIcon /> },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  const handleClick = (label: string) => {
    onClose();

    if (label === "Home") {
      navigate("/");
    }

    if (label === "Menu") {
      navigate("/", { state: { scrollToFood: true } });
    }

    if (label === "Cart") {
      navigate("/cart");
    }

    if (label === "Orders") {
      navigate("/orders");
    }
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250, pt: 2 }} role="presentation">
        <List>
          {menuItems.map(({ label, icon }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => handleClick(label)}>
                <ListItemIcon sx={{ color: "#080808" }}>
                  {label === "Cart" ? (
                    <Badge
                      badgeContent={cartCount}
                      color="error"
                      invisible={cartCount === 0}
                    >
                      {icon}
                    </Badge>
                  ) : (
                    icon
                  )}
                </ListItemIcon>

                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: "monster",
                      fontSize: 20,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
