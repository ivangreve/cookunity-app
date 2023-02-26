import { Grid } from "@mui/material";
import React from "react";
import SkeletonCard from "../SkeletonCard/Skeleton";

function SkeletonCards() {
  return (
    <Grid container>
      <Grid className="skeleton_card_container" xs={12} sm={6} md={4}>
        <SkeletonCard />
      </Grid>
      <Grid className="skeleton_card_container" xs={12} sm={6} md={4}>
        <SkeletonCard />
      </Grid>
      <Grid className="skeleton_card_container" xs={12} sm={6} md={4}>
        <SkeletonCard />
      </Grid>
      <Grid className="skeleton_card_container" xs={12} sm={6} md={4}>
        <SkeletonCard />
      </Grid>
      <Grid className="skeleton_card_container" xs={12} sm={6} md={4}>
        <SkeletonCard />
      </Grid>
      <Grid className="skeleton_card_container" xs={12} sm={6} md={4}>
        <SkeletonCard />
      </Grid>
    </Grid>
  );
}

export default SkeletonCards;
