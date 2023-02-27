import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { createMeal, getAllMealsByChef } from "../services/meal.service";
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
  const user = useSelector((state: any) => state.user.user);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [rateAvg, setRateAvg] = useState(0);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [filterByName, setFilterByMeal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
    const meals = await getAllMealsByChef(user._id);
    setMeals(meals.data);
    calculateAvg(meals.data);
    setFilteredMeals(meals.data);
    setIsLoading(false);
  };

  const calculateAvg = (meals: Meal[]) => {
    const ratedMeals = meals.filter((m) => m.rating !== 0);
    const totalRatings = ratedMeals.reduce(
      (total, meal) => total + meal.rating,
      0
    );
    const averageRating = ratedMeals.length
      ? totalRatings / ratedMeals.length
      : 0;
    setRateAvg(averageRating);
  };

  /** Filtering */
  const performFiltering = () => {
    const mealsFilteresByName = meals.filter((m) =>
      m.name.toLowerCase().includes(filterByName)
    );
    setFilteredMeals(mealsFilteresByName);
  };

  const onMealFilterChange = (event: any) => {
    const filter = event.target.value;
    setFilterByMeal(filter);
  };

  const clearFilters = () => {
    setFilterByMeal("");
  };

  useEffect(() => {
    performFiltering();
  }, [filterByName]);
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
      <h1>🎉Welcome {user && user.name}! 🎉</h1>

      <>
        {rateAvg === 0 ? (
          <h3 className="chef_portal_title">😢 There is no rated meals yet!</h3>
        ) : (
          <h3 className="chef_rating_text">
            ✨🍝 Your rating average: {rateAvg.toFixed(1)}
          </h3>
        )}

        <span className="chef_portal_action_panel">
          <Button
            size="small"
            variant="contained"
            color="primary"
            className="create_meal_btn"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Create Meal
          </Button>

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
              <MealCard
                meal={meal}
                callbackAfterDelete={fetchAllMeals}
              ></MealCard>
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
