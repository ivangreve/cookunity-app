import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getAllMeals } from "../services/meal.service";
import { Meal } from "../../../models";
import MealCard from "../../../components/MealCard/MealCard";
import { LoggedUserLayout } from "../../../layouts";
import { useSelector } from "react-redux";

export default function ChefPortal() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [rateAvg, setRateAvg] = useState("0");
  const user = useSelector((state) => state.user.user);

  const fetchAllMeals = async () => {
    const meals = await getAllMeals();
    setMeals(meals.data);
    debugger;
    calculateAvg(meals.data);
  };

  const calculateAvg = (meals: Meal[]) => {
    const totalRatings = meals.reduce((total, meal) => total + meal.rating, 0);
    const averageRating = meals.length ? totalRatings / meals.length : 0;
    debugger;
    setRateAvg(averageRating.toFixed(1));
  };

  useEffect(() => {
    fetchAllMeals();
  }, []);

  return (
    <LoggedUserLayout>
      <h1>Welcome {user && user.name}!</h1>
      <h2>Rate average: {rateAvg}</h2>
      <Grid container spacing={4}>
        {meals.map((meal) => (
          <Grid item key={meal._id} xs={12} sm={6} md={4}>
            <MealCard meal={meal}></MealCard>
          </Grid>
        ))}
      </Grid>
    </LoggedUserLayout>
  );
}
