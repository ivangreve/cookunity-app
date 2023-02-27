import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, waitFor, fireEvent } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import MealCard from "./MealCard";
import { Provider } from "react-redux";
import store from "../../store/store";
import { Meal } from "../../models";

const mockMeal = {
  _id: "1",
  name: "Mock Meal",
  description: "This is a mock meal",
  image: "mockImage.jpg",
  chef: {
    image: "mockChefImage.jpg",
  },
  rating: 4.5,
  your_rating: 0,
};

describe("MealCard component", () => {
  test("renders the meal name and description", () => {
    render(
      <Provider store={store}>
        <MealCard meal={mockMeal as Meal} />{" "}
      </Provider>
    );

    expect(screen.getByText(mockMeal.name)).toBeInTheDocument();
    expect(screen.getByText(mockMeal.description)).toBeInTheDocument();
  });

  test("Renders the meal image", () => {
    render(
      <Provider store={store}>
        <MealCard meal={mockMeal as Meal} />{" "}
      </Provider>
    );

    const meatImage = screen.getByAltText("Meat Image");
    console.log(meatImage);
    expect(meatImage).toBeInTheDocument();
    expect(meatImage).toHaveAttribute("src", mockMeal.image);
  });

  test("renders the chef image", () => {
    render(
      <Provider store={store}>
        <MealCard meal={mockMeal as Meal} />{" "}
      </Provider>
    );

    const chefImage = screen.getByAltText("Chef Image");
    expect(chefImage).toBeInTheDocument();
    expect(chefImage).toHaveAttribute("src", mockMeal.chef.image);
  });

  test("renders the global rating for chefs", () => {
    render(
      <Provider store={store}>
        <MealCard
          meal={mockMeal as Meal}
          readonly={true}
          isCustomerCard={false}
        />
      </Provider>
    );

    expect(screen.getByText(`Global rating:`)).toBeInTheDocument();
  });

  test("Renders the customer rating for customer portal", () => {
    mockMeal.your_rating = 0;
    render(
      <Provider store={store}>
        <MealCard
          meal={mockMeal as Meal}
          readonly={false}
          isCustomerCard={true}
        />
      </Provider>
    );

    expect(screen.getByText(`Rate this meal!`)).toBeInTheDocument();
  });

  test("If customer already rate, showing 'Your rate'", async () => {
    mockMeal.your_rating = 3;
    render(
      <Provider store={store}>
        <MealCard meal={mockMeal as Meal} isCustomerCard={true} />
      </Provider>
    );
    expect(screen.getByText(`Your rate:`)).toBeInTheDocument();
  });
});
