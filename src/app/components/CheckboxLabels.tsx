import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxLabels({ label, checked, onChange}: { label: string, checked: boolean, onChange: () => void}) {
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
        checked={checked}
        onChange={onChange}
      />
  );
}
