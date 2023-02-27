import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { MealDto } from "../../models";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface CreateMealModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (meal: MealDto) => void;
}

export default function CreateMealModal(props: CreateMealModalProps) {
  const { open, onClose, onSubmit } = props;
  const [meal, setMeal] = React.useState<MealDto>(new MealDto());

  const handleNameChange = (event: any) => {
    setMeal((state: any) => ({
      ...state,
      name: event.target.value,
    }));
  };

  const handleImageChange = (event: any) => {
    setMeal((state: any) => ({
      ...state,
      image: event.target.value,
    }));
  };

  const handleDescriptionChange = (event: any) => {
    setMeal((state: any) => ({
      ...state,
      description: event.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(meal);
    onClose();
    setMeal(new MealDto());
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="create-meal-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="create-meal-dialog-title" onClose={onClose}>
        Create new meal 🍽️
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          required
          value={meal.name}
          onChange={handleNameChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          required
          value={meal.description}
          onChange={handleDescriptionChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image URL"
          value={meal.image}
          onChange={handleImageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          disabled={!meal.name || !meal.description || !meal.image}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
