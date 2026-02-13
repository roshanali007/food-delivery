import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearCart } from "../redux/cartSlice";
import { useState } from "react";


const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("cod");
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);


  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
  if (paymentMethod === "upi") {
        if (!isMobile) {
        alert("📱 UPI payment works only on mobile devices");
        return;
        }

        const upiUrl = `upi://pay?pa=roshanalink123@oksbi&pn=Food App&am=${total}&cu=INR`;
        window.location.href = upiUrl;
        return;
    }

    alert("✅ Order placed successfully!");
    dispatch(clearCart());
    navigate("/");
    };



  if (cartItems.length === 0) {
    navigate("/");
    return null;
    }

  return (
    <Box maxWidth={500} mx="auto" mt={5} px={2}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          Payment Method
        </Typography>

        <Typography mb={2}>
          Total Amount: <strong>₹{total}</strong>
        </Typography>

        <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            >

          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery"
          />
          <FormControlLabel
            value="upi"
            control={<Radio />}
            label="UPI (Google Pay / PhonePe)"
          />
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit / Debit Card"
          />
        </RadioGroup>

        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 3 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
};

export default Payment;
