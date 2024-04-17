import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

// Custom styled component for the select input
const SelectInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    color: "white",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    color: "white",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default SelectInput;
