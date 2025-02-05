import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  mx: "auto",
  backgroundColor: "",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "red",
  }),
}));
//-----------------------------------Font theme-------------------------

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.3rem",
  "@media (min-width:600px)": {
    fontSize: "1.3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.3rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.0rem",
  "@media (min-width:600px)": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
};
theme.typography.h5 = {
  fontSize: "0.8rem",
  "@media (min-width:600px)": {
    fontSize: "1.0rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
};

//-----------------------------------------api req--------------------------------

function ProductListing(props) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          mx={2}
          rowSpacing={1}
          sx={{
            marginTop: "12px",
          }}
        >
          {props.fiterP.length > 0 ? (
            props.fiterP.map((itemV, indx) => (
              <Grid
                key={indx}
                size={{
                  xs: 12,
                  sm: 4,
                  md: 3,
                }}
                rowSpacing={1}
              >
                <Item
                  sx={{
                    height: "400px",
                    placeItems: "center",
                    display: "flex",
                    flexDirection: "column", // Stack items vertically
                    alignItems: "center", // Center items horizontally
                    justifyContent: "center", // Center items vertically
                    textAlign: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      maxWidth: "200px",
                      height: "150px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    key={indx.id}
                    image={itemV.image} // ✅ Product image URL
                    alt={"Not Found"}
                  />
                  <ThemeProvider theme={theme}>
                    <Typography variant="h3" id="title" key={indx.id}>
                      {itemV.title}
                    </Typography>
                    <Typography variant="h4" id="price" key={indx.id}>
                      {itemV.price}
                    </Typography>
                    <Typography variant="h5" id="category" key={indx.id}>
                      {itemV.category}
                    </Typography>
                  </ThemeProvider>
                </Item>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h5"
              sx={{ textAlign: "center", width: "100%", mt: 2 }}
            >
              No products found.
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default ProductListing;
