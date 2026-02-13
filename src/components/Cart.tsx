import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  const navigate = useNavigate();


  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Typography align="center" mt={5}>
        🛒 Cart is empty
      </Typography>
    );
  }

  return (
    <Box maxWidth={800} mx="auto" mt={4} px={2}>
      <Typography variant="h4" mb={3}>
        Your Cart
      </Typography>

      {cartItems.map(item => (
        <Card key={item.id} sx={{ display: "flex", mb: 2 }}>
          <CardMedia component="img" image={item.img} sx={{ width: 120 }} />

          <CardContent sx={{ flex: 1 }}>
            <Typography fontWeight="bold">{item.name}</Typography>
            <Typography>₹{item.price}</Typography>

            <Box display="flex" alignItems="center" mt={1}>
              <IconButton onClick={() => dispatch(decreaseQty(item.id))}>
                <RemoveIcon />
              </IconButton>

              <Typography>{item.quantity}</Typography>

              <IconButton onClick={() => dispatch(increaseQty(item.id))}>
                <AddIcon />
              </IconButton>

              <IconButton
                sx={{ ml: "auto" }}
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider />

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">₹{total}</Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 3 }}
        onClick={() => navigate("/cart/payment")}
      >
        Checkout
      </Button>

    </Box>
  );
};

export default Cart;
