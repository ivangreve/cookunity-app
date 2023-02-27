import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "../../../test-utils.ts";
import userEvent from "@testing-library/user-event";
import CreateMealModal from "./CreateMealModal";

describe("CreateMealModal", () => {
  it("should render correctly", () => {
    const component = render(
      <CreateMealModal open={true} onClose={() => {}} onSubmit={() => {}} />
    );
    expect(screen.getByText("Create new meal 🍽️")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
});

it("Should exist inputs name ,description, image and buttons", async () => {
  render(
    <CreateMealModal open={true} onClose={() => {}} onSubmit={() => {}} />
  );

  const createButton = screen.getByRole("button", { name: "Create" });
  expect(createButton).toBeDisabled();
  const cancelButton = screen.getByRole("button", { name: "Cancel" });
  expect(cancelButton).toBeEnabled();

  const nameInput = screen.getByRole("textbox", { name: /Name/i });
  const descriptionInput = screen.getByRole("textbox", {
    name: /Description/i,
  });
  const imageInput = screen.getByRole("textbox", { name: /Image URL/i });

  expect(nameInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(imageInput).toBeInTheDocument();
  expect(createButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

it("Confirm button should be disabled if there is no name and description", async () => {
  render(
    <CreateMealModal open={true} onClose={() => {}} onSubmit={() => {}} />
  );

  const createButton = screen.getByRole("button", { name: "Create" });
  expect(createButton).toBeDisabled();

  const nameInput = screen.getByRole("textbox", { name: /Name/i });
  const descriptionInput = screen.getByRole("textbox", {
    name: /Description/i,
  });

  await userEvent.type(nameInput, "type something");
  expect(createButton).toBeDisabled();

  await userEvent.type(descriptionInput, "type something");
  expect(createButton).toBeEnabled();
});
