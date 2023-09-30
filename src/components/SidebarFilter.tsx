import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function valuetext(value: number) {
  return `$${value}`;
}

function SidebarFilter({
  price,
  setPrice,
  setSelectedCategory,
}: {
  price: number[];
  setPrice: Function;
  setSelectedCategory: Function;
}) {
  const [value, setValue] = useState<number[]>(price);
  const categories = useSelector((state: AppState) => state.categories.data);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommited = (
    event: Event | React.SyntheticEvent<Element | Event>,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[]);
    setPrice(newValue as number[]);
  };

  const handleChangeCategory = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setSelectedCategory((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={0}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="All"
                defaultChecked
                onChange={handleChangeCategory}
              />
              {categories.map((category) => {
                return (
                  <FormControlLabel
                    value={category.id}
                    control={<Radio />}
                    label={category.name}
                    onChange={handleChangeCategory}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ margin: "2rem 0rem" }}>
        <Typography variant="h6" marginBottom={"1rem 0rem"}>
          Price
        </Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChangeCommitted={handleChangeCommited}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={5000}
        />
      </Box>
    </div>
  );
}

export default SidebarFilter;
