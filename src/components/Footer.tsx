import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        mt: 6,
        pt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo & About */}
          <Grid size={{xs:12, md:4}} >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DeliveryDiningIcon fontSize="large" color="warning" />
              <Typography variant="h6"  fontFamily={'monster'}>
                FoodExpress
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              Fast & fresh food delivery at your doorstep. Order from your
              favourite restaurants anytime.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs:12, md:4}}>
            <Typography variant="h6" gutterBottom fontFamily={'monster'}>
              Quick Links
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              Home
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              Restaurants
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              Orders
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              Contact Us
            </Typography>
          </Grid>

          {/* Contact & Social */}
          <Grid size={{xs:12, md:4}}>
            <Typography variant="h6" gutterBottom fontFamily={'monster'}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              📍 Tirur, Malappuram
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              📞 +91 90744 49535 
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }} fontFamily={'monster'}>
              ✉️ support@foodExpress.com
            </Typography>

            <Box mt={2}>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "#333" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#aaa", pb: 2 }}
          fontFamily={'monster'}
        >
          © {new Date().getFullYear()} FoodExpress. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
