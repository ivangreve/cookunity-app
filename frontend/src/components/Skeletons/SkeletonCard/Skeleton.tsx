import { Skeleton } from "@mui/material";
import React from "react";

function SkeletonCard() {
  return (
    <Skeleton
      variant="rectangular"
      min-width={262}
      height={450}
      //sx={{ marginRight: "32px", marginTop: "32px" }}
    />
  );
}

export default SkeletonCard;
