import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Rating } from "react-simple-star-rating";
import { Meal } from "../../models/Meal.model";
import { rateMeal } from "../../pages/AuthorizedPages/services/meal.service";
import { useSelector } from "react-redux";

interface Params {
  meal: Meal;
  readonly?: boolean;
}

function MealCard({ meal, readonly = true }: Params) {
  const [rating, setRating] = useState(0);
  const user = useSelector((state: any) => state.user.user);

  const handleRating = async (rate: number) => {
    console.log(rate);
    setRating(rate);
    try {
      await rateMeal(meal._id, user._id, rate);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    // Set the initial value
    setRating(0);
  };

  return (
    <Card
      className="meal_card_card"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        className="meal_card_media"
        component="img"
        image={meal.image}
        alt="random"
      />
      <CardContent className="meal_card_content" sx={{ flexGrow: 1 }}>
        <Typography className="meal_card_heading" gutterBottom variant="h6">
          {meal.name}
        </Typography>
        <Typography className="meal_card_sub-heading" variant="caption">
          {meal.description}
        </Typography>
        <Divider className="divider" light />

        <div className="meal_card_rating_container">
          <Avatar
            sizes="sm"
            alt="Meal Image"
            src={meal.chef?.image ? meal.chef.image : ""}
          />

          <Rating
            readonly={readonly}
            size={20}
            allowFraction
            initialValue={meal.rating}
            onClick={handleRating}
          />
          <span>
            {meal.rating}/<strong>5</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default MealCard;
