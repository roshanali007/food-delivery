import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearOrders } from "../redux/orderSlice";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.order.orders);
  const latestOrder = orders[0];

  const handleClearOrders = () => {
    dispatch(clearOrders());
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Paper sx={{ p: 4, maxWidth: 500, width: "100%", textAlign: "center" }}>
        {!latestOrder ? (
          <>
            <Typography variant="h5" gutterBottom>
              No Orders Found
            </Typography>

            <Typography color="text.secondary" mb={3}>
              You haven’t placed any orders yet.
            </Typography>

            <Button variant="contained" fullWidth onClick={() => navigate("/")}>
              Go to Home
            </Button>
          </>
        ) : (
          <>
            <CheckCircleIcon sx={{ fontSize: 70, color: "green" }} />

            <Typography variant="h4" mt={2} gutterBottom>
              Order Placed!
            </Typography>

            <Typography color="text.secondary" mb={3}>
              Thank you for your order. Your food will be delivered soon 🍽️
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight="bold" mb={1}>
              Order Summary
            </Typography>

            {latestOrder.items.map((item) => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography>
                  {item.name} × {item.quantity}
                </Typography>
                <Typography>₹{item.price * item.quantity}</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold">Total</Typography>
              <Typography fontWeight="bold">₹{latestOrder.total}</Typography>
            </Box>

            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>

            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleClearOrders}
            >
              Clear Orders
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Orders;
