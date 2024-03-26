import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({ label }: { label: string}) {
  return (
      <FormControlLabel
      value={label}
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
        label={label}
      />
  );
}
