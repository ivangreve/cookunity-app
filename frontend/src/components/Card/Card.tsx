import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Meal } from "../../models/Meal.model";
import "./Card.css";

interface Params {
  meal: Meal;
}

function Card({ meal }: Params) {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleReset = () => {
    // Set the initial value
    setRating(0);
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={meal.image} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {meal.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {meal.description}
        </p>
        <div className="ratingContainer">
          <Rating readonly allowFraction initialValue={meal.rating.average} />
          <span className="text-lg font-bold self-center">
            {meal.rating.average}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
