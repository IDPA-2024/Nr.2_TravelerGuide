import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels() {
  return (
    <FormGroup className="bg-gray-700">
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "#0BCAAD",
              },
            }}
          />
        }
        label="Checkbox1"
      />
      <FormControlLabel control={<Checkbox />} label="Checkbox2" />
      <FormControlLabel control={<Checkbox />} label="Checkbox3" />
      <FormControlLabel control={<Checkbox />} label="Checkbox4" />
      <FormControlLabel control={<Checkbox />} label="Checkbox5" />
      <FormControlLabel control={<Checkbox />} label="Checkbox6" />
    </FormGroup>
  );
}
