import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getMyRatingMeals } from "../services/meal.service";
import { Meal } from "../../../models";
import MealCard from "../../../components/MealCard/MealCard";
import { LoggedUserLayout } from "../../../layouts";
import { useSelector } from "react-redux";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-hot-toast";
import SkeletonCards from "../../../components/Skeletons/SkeletonCards/SkeletonCards";
import NoneMeals from "../../../components/NoneMeals/NoneMeals";

export default function ChefPortal() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [filterByChef, setFilterByChef] = useState("");
  const [filterByName, setFilterByMeal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: any) => state.user.user);

  const fetchAllMeals = async () => {
    setIsLoading(true);
    const meals = await getMyRatingMeals(user._id);
    setMeals(meals.data);
    setFilteredMeals(meals.data);
    setIsLoading(false);
  };

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

  useEffect(() => {
    fetchAllMeals();
  }, []);

  return (
    <LoggedUserLayout>
      <h1 className="chef_portal_title">🎉Welcome {user && user.name}!🎉</h1>
      <h3 className="chef_rating_text">😀 You can rate the following meals!</h3>
      <span className="chef_portal_action_panel">
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

      {isLoading ? (
        <SkeletonCards />
      ) : (
        <Grid container spacing={4}>
          {filteredMeals?.map((meal) => (
            <Grid item key={meal._id} xs={12} sm={6} md={4}>
              <MealCard
                isCustomerCard={true}
                readonly={false}
                meal={meal}
                callbackAfterRating={fetchAllMeals}
              ></MealCard>
            </Grid>
          ))}
        </Grid>
      )}

      {meals.length === 0 && !isLoading ? <NoneMeals></NoneMeals> : null}
    </LoggedUserLayout>
  );
}
