import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Rating } from "react-simple-star-rating";
import { Meal } from "../../models/Meal.model";
import { rateMeal } from "../../pages/AuthorizedPages/services/meal.service";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

interface Params {
  meal: Meal;
  readonly?: boolean;
  isCustomerCard?: boolean;
  callbackAfterRating?: Function;
}

function MealCard({
  meal,
  readonly = true,
  isCustomerCard = false,
  callbackAfterRating = () => {},
}: Params) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user.user);

  const handleRating = async (rate: number) => {
    setRating(rate);
    setLoading(true);
    toast.promise(
      rateMeal(meal._id, user._id, rate).then(async () => {
        // Update Meals
        await callbackAfterRating();
        setLoading(false);
      }),
      {
        loading: "Rating Meal...",
        success: <b>Meal Rated!</b>,
        error: <b>Something went wrong 😔</b>,
      }
    );
  };

  const handleReset = () => {
    setRating(0);
  };

  const ratingBox = () => {
    /** Customer View */
    if (isCustomerCard) {
      const alreadyRated = meal.your_rating > 0;
      return (
        <>
          <h6 className="text-center">
            {alreadyRated ? "Your rate:" : "Rate this meal!"}{" "}
          </h6>
          <div className="meal_card_rating_container">
            <Avatar
              sizes="sm"
              alt="Meal Image"
              src={meal.chef?.image ? meal.chef.image : ""}
            />

            <Rating
              readonly={alreadyRated || loading}
              size={20}
              allowFraction
              initialValue={meal.your_rating}
              onClick={handleRating}
            />
            <span>
              {meal.your_rating}/<strong>5</strong>
            </span>
          </div>
        </>
      );
    }
    /** */

    /** Chef View */
    return (
      <>
        <h6 className="text-center">Global rating:</h6>
        <div className="meal_card_rating_container">
          <Avatar
            sizes="sm"
            alt="Chef Image"
            src={meal.chef?.image ? meal.chef.image : ""}
          />

          <Rating
            readonly={readonly}
            size={20}
            allowFraction
            initialValue={meal.rating}
          />
          <span>
            {meal.rating}/<strong>5</strong>
          </span>
        </div>
      </>
    );
    /** */
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
        alt="Meat Image"
      />
      <CardContent className="meal_card_content" sx={{ flexGrow: 1 }}>
        <Typography className="meal_card_heading" gutterBottom variant="h6">
          {meal.name}
        </Typography>
        <Typography className="meal_card_sub-heading" variant="caption">
          {meal.description}
        </Typography>
        <Divider className="divider" light />

        {ratingBox()}
      </CardContent>
    </Card>
  );
}

export default MealCard;
