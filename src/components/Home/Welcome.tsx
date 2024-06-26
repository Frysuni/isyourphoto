/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useTheme, useMediaQuery, Box, Typography, Grid } from "@mui/material";

const Welcome = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });

  const GridItemHeadlineBlock = () => (
    <Box>
      <Typography
        variant={isSm ? "body1" : "body2"}
        component="p"
        color="secondary"
        align="center"
        sx={{
          mb: 1,
          color: "#f9f9f9",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
        }}
      >
        Ethereal Moment Capturer
      </Typography>
      <Typography
        variant={isSm ? "h2" : "h3"}
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#f9f9f9",
          letterSpacing: { xs: "normal", lg: "2px" },
        }}
      >
        Ksyu <br /> Photographer
      </Typography>
      <Typography
        variant={isSm ? "h6" : "body1"}
        component="p"
        align="center"
        sx={{
          fontWeight: 400,
          color: "#f9f9f9",
          letterSpacing: "1.5px",
        }}
      >
        UFA, Blagoveschensk
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
          >
            <GridItemHeadlineBlock />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
