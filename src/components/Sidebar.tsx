import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Menu", icon: <RestaurantMenuIcon /> },
  { label: "Orders", icon: <ReceiptLongIcon /> },
  { label: "Cart", icon: <ShoppingCartIcon /> },
  { label: "Profile", icon: <PersonIcon /> },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{ width: 250, pt: 2, fontFamily: "monster" }}
        role="presentation"
        onClick={onClose}
      >
        <List sx={{fontFamily:'monster'}}>
          {menuItems.map(({ label, icon }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color:"#080808"}}>{icon}</ListItemIcon>
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
