import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Overview from "./tabs/Overview";
import Route from "./tabs/Route";
import Comments from "./tabs/Comments";

function CustomTabPanel(props: {
  children: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({restaurant}: {restaurant: any}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          sx={{ width: "100%", color: "white" }}
          variant="fullWidth"
          textColor="inherit"
        >
          <Tab label="Übersicht" {...a11yProps(0)} />
          <Tab label="Kommentare" {...a11yProps(1)} />
          <Tab
            label="Route"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Overview restaurant={restaurant} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Comments restaurant={restaurant} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Route restaurant={restaurant}/>
      </CustomTabPanel>
    </Box>
  );
}
