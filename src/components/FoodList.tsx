import { useEffect, useMemo, useState, useRef } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid"; 
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";




type Meal = {
  id: number;
  name: string;
  img: string;
  dsc: string;
  price: number;
  rate: number;
};

const ITEMS_PER_PAGE = 12;
const CARD_IMAGE_HEIGHT = 180;


export default function FoodList() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  
  const prevSearchRef = useRef<string>("");

  useEffect(() => {
    fetch("https://free-food-menus-api-two.vercel.app/all")
      .then((res) => res.json())
      .then((data: Record<string, Meal[]>) => {
        const allMeals: Meal[] = Object.values(data)
          .flat()
          .filter(
            (meal) =>
              meal.img &&
              typeof meal.img === "string" &&
              meal.img.trim() !== ""
          );

        setMeals(allMeals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  
  useEffect(() => {
    if (search !== prevSearchRef.current) {
      setVisibleCount(ITEMS_PER_PAGE);
      prevSearchRef.current = search;
    }
  }, [search]);

  const filteredMeals = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return meals;

    const words = searchTerm.split(/\s+/);

    return meals.filter((meal) => {
      const text = `${meal.name} ${meal.dsc}`.toLowerCase();

      return words.every((word) => {
        
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escaped}`, "i");
        return regex.test(text);
      });
    });
  }, [meals, search]);


  const itemsToShow = Math.min(visibleCount, filteredMeals.length);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 6,
        mb: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={4} fontFamily="monster">
        Popular Food Items 🍽️
      </Typography>
      <TextField
        placeholder="Search food..."
        variant="outlined"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{ mb: 4, width: "100%", maxWidth: 400 }}
      />

      {filteredMeals.length === 0 ? (
        <Typography mt={6} color="text.secondary" fontFamily="monster">
          No food items found 🍽️
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredMeals.slice(0, itemsToShow).map((meal, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: "flex", justifyContent: "center" }}
              key={`${meal.id}-${meal.name}-${index}`}
            >
              <Card
                sx={{
                  height: "100%",
                  width: 300,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={meal.img}
                  alt={meal.name}
                  sx={{
                    height: CARD_IMAGE_HEIGHT,
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontFamily="monster"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {meal.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="monster"
                    sx={{
                      mb: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {meal.dsc}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      color="error"
                      fontFamily="monster"
                    >
                      ₹{meal.price}
                    </Typography>
                    <Typography fontSize={14} fontFamily="monster">
                      ⭐ {meal.rate}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: "auto", borderRadius: 2 }}
                    onClick={() =>
                    dispatch(
                      addToCart({
                        id: meal.id,
                        name: meal.name,
                        price: meal.price,
                        img: meal.img,
                        quantity: 1,
                      })
                    )
                  }
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {visibleCount < filteredMeals.length && (
        <Box sx={{ mt: 5 }}>
          <Button
            variant="outlined"
            color="error"
            size="large"
            sx={{ fontFamily: "monster" }}
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + ITEMS_PER_PAGE, filteredMeals.length)
              )
            }
          >
            Show More
          </Button>
        </Box>
      )}
    </Container>
  );
}
