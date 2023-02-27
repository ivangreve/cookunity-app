import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Rating } from "react-simple-star-rating";
import { Meal } from "../../models/Meal.model";
import {
  deleteMeal,
  rateMeal,
} from "../../pages/AuthorizedPages/services/meal.service";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";

interface Params {
  meal: Meal;
  readonly?: boolean;
  isCustomerCard?: boolean;
  callbackAfterRating?: Function;
  callbackAfterDelete?: Function;
}

function MealCard({
  meal,
  readonly = true,
  isCustomerCard = false,
  callbackAfterRating = () => {},
  callbackAfterDelete = () => {},
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

  const handlingDeleteMeal = async () => {
    setLoading(true);
    toast.promise(
      deleteMeal(meal._id).then(async () => {
        await callbackAfterDelete();
        setLoading(false);
      }),
      {
        loading: "Removing Meal...",
        success: <b>Meal removed!</b>,
        error: <b>Something went wrong 😔</b>,
      }
    );
  };

  const removeButton = () => {
    return !isCustomerCard ? (
      <IconButton
        onClick={handlingDeleteMeal}
        className="meal_card_remove_icon"
        aria-label="delete"
      >
        <DeleteIcon></DeleteIcon>
      </IconButton>
    ) : null;
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
      <div className="meal_card_image_container">
        {removeButton()}
        <CardMedia
          className="meal_card_media"
          component="img"
          image={meal.image}
          alt="Meat Image"
        />
      </div>
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
