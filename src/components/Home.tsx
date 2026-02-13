import { Box, Typography, Button } from "@mui/material";

type HomeProps = {
  onOrderNow: () => void;
};

const Home = ({ onOrderNow }: HomeProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        width: "100%",
      }}
    >
      <Box
        component="img"
        src="/mandi.jpg"
        alt="Delicious food"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h3" fontWeight="bold" fontFamily={"monster2"}>
          Delicious Food, Delivered Fast
        </Typography>

        <Typography
          variant="h6"
          sx={{ mt: 2, maxWidth: 600 }}
          fontFamily={"monster2"}
        >
          Order from your favorite restaurants and get fresh, hot meals
          delivered right to your doorstep.
        </Typography>

        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ mt: 4, borderRadius: 8, fontFamily: "monster2" }}
          onClick={onOrderNow}
        >
          Order Now
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
