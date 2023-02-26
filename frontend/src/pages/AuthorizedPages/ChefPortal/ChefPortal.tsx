import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { createMeal, getAllMeals } from "../services/meal.service";
import { Meal, MealDto } from "../../../models";
import MealCard from "../../../components/MealCard/MealCard";
import { LoggedUserLayout } from "../../../layouts";
import { useSelector } from "react-redux";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import NoneMeals from "../../../components/NoneMeals/NoneMeals";
import CreateMealModal from "../../../components/CreateMealModal/CreateMealModal";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-hot-toast";
import SkeletonCards from "../../../components/Skeletons/SkeletonCards/SkeletonCards";

export default function ChefPortal() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [rateAvg, setRateAvg] = useState("0");
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [filterByChef, setFilterByChef] = useState("");
  const [filterByName, setFilterByMeal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const user = useSelector((state: any) => state.user.user);

  const handleCreateMeal = async (meal: MealDto) => {
    meal.chef = user._id;
    await toast.promise(
      createMeal(meal.name, meal.chef, meal.description, meal.image),
      {
        loading: "Saving Meal...",
        success: <b>Meal saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
    fetchAllMeals();
  };

  const fetchAllMeals = async () => {
    setIsLoading(true);
    const meals = await getAllMeals();
    setMeals(meals.data);
    calculateAvg(meals.data);
    setFilteredMeals(meals.data);
    setIsLoading(false);
  };

  const calculateAvg = (meals: Meal[]) => {
    const totalRatings = meals.reduce((total, meal) => total + meal.rating, 0);
    const averageRating = meals.length ? totalRatings / meals.length : 0;
    setRateAvg(averageRating.toFixed(1));
  };

  /** Filtering */
  const performFiltering = () => {
    if (!filterByChef && !filterByName) {
      setFilteredMeals(meals);
      return;
    }

    if (filterByName) {
      const mealsFilteresByName = meals.filter((m) =>
        m.name.toLowerCase().includes(filterByName)
      );
      setFilteredMeals(mealsFilteresByName);
    }

    if (filterByChef) {
      const mealsFilteresByChef = meals.filter((m) =>
        m.chef.name.toLowerCase().includes(filterByChef)
      );
      setFilteredMeals(mealsFilteresByChef);
    }
  };

  const onMealFilterChange = (event: any) => {
    const filter = event.target.value;
    setFilterByMeal(filter);
  };

  const onChefFilterChange = (event: any) => {
    const filter = event.target.value;
    setFilterByChef(filter);
  };

  const clearFilters = () => {
    setFilterByChef("");
    setFilterByMeal("");
  };

  useEffect(() => {
    performFiltering();
  }, [filterByChef, filterByName]);
  /** */

  /** Modal handlers */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /** */

  useEffect(() => {
    fetchAllMeals();
  }, []);

  return (
    <LoggedUserLayout>
      <h1>Welcome {user && user.name}!</h1>

      <>
        <h2>Rate average: {rateAvg}</h2>

        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ marginRight: "20px" }}
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Create Meal
          </Button>
          <Paper
            component="form"
            sx={{
              m: "15px 15px 15px 0px",
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              value={filterByChef}
              onChange={onChefFilterChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Chef"
              inputProps={{ "aria-label": "Filter by Chef" }}
            />
          </Paper>

          <Paper
            component="form"
            sx={{
              m: "15px 0px 15px 0px",
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              onChange={onMealFilterChange}
              value={filterByName}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Meal"
              inputProps={{ "aria-label": "Filter by Chef" }}
            />
          </Paper>
          <IconButton
            onClick={clearFilters}
            sx={{ height: "40px", marginLeft: "5px" }}
            aria-label="delete"
          >
            <ClearIcon />
          </IconButton>
        </span>
      </>

      {isLoading ? (
        <SkeletonCards />
      ) : (
        <Grid container spacing={4}>
          {filteredMeals.map((meal) => (
            <Grid item key={meal._id} xs={12} sm={6} md={4}>
              <MealCard meal={meal}></MealCard>
            </Grid>
          ))}
        </Grid>
      )}

      {meals.length === 0 && !isLoading ? <NoneMeals></NoneMeals> : null}

      <CreateMealModal
        open={open}
        onClose={handleClose}
        onSubmit={handleCreateMeal}
      ></CreateMealModal>
    </LoggedUserLayout>
  );
}
