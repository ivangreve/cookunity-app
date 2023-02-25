import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getAllMeals } from "../services/meal.service";
import { Meal } from "../../../models";
import MealCard from "../../../components/MealCard/MealCard";
import { LoggedUserLayout } from "../../../layouts";

export default function CustomerPortal() {
  const [meals, setMeals] = useState<Meal[]>([]);
  useEffect(() => {
    fetchAllMeals();
  }, []);

  async function fetchAllMeals() {
    const meals = await getAllMeals();
    console.log(meals.data);
    setMeals(meals.data);
  }

  return (
    <LoggedUserLayout>
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
