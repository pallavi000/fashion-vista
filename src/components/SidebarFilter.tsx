import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Slider } from "@mui/material";
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
}: {
  price: number[];
  setPrice: Function;
}) {
  const categories = useSelector((state: AppState) => state.categories.data);

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue);
    setPrice(newValue as number[]);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories.map((category) => {
            return (
              <Link to={`/category/${category.id}/products`}>
                <Button
                  sx={{ display: "block", width: "100%", textAlign: "left" }}
                >
                  {category.name}
                </Button>
              </Link>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Box sx={{ margin: "2rem 0rem" }}>
        <Typography variant="h6" marginBottom={"1rem 0rem"}>
          Price
        </Typography>

        <Slider
          getAriaLabel={() => "Temperature range"}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={1000}
        />
      </Box>
    </div>
  );
}

export default SidebarFilter;
