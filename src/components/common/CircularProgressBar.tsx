import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Waves } from "@mui/icons-material";

const CircularProgressBar = () => {
  return (
    <div className="flex h-20 w-20">
      <CircularProgress color="secondary" value={100} className="!h-20 !w-20" />
    </div>
  );
};

export default CircularProgressBar;
