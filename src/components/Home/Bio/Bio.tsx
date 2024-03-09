import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Container } from "@mui/material";
import { LandingAbout } from "../../../types/strapi/Landing";
import { getStrapiMedia } from "../../../lib/getStrapiMedia";
import { randomElement } from "../../../utils/randomElement";
import { fetchGallery } from "../../../lib/fetchGallery";
import { useEffect, useState } from "react";
import { GalleryManifest } from "../../../types/gallery";

interface BioProps {
  aboutData: LandingAbout;
}

const Bio = ({ aboutData }: BioProps) => {
  const { title, description } = aboutData;
  const [ imageUrl, setImage ] = useState<string>();
  useEffect(() => {
    const aaaaaa = async () => {
      const collection = randomElement<GalleryManifest>(await fetchGallery());
      const image = randomElement(collection.images);
      setImage(image);
      setTimeout(aaaaaa, 3000);
    };
    aaaaaa();
  }, [])
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant="h4" fontWeight="700" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box display="flex" sx={{ gap: 1.75 }} flexDirection={'column'}>
                  <Link href="/work" passHref>
                    <Button variant="outlined" style={{ fontSize: '2rem'}} sx={{ px: { md: 20 } }}>
                      <Box
                        component="img"
                        src={"/images/main-icon.png"}
                        alt="Icon"
                        width={50}
                        height={50}
                        mr={0.6}
                      />
                      Gallery
                    </Button>
                  </Link>
                  <Link href="/contact" passHref>
                    <Button variant="outlined" sx={{ px: { md: 20 } }} style={{ fontSize: '2rem'}} type="submit">Contact</Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          {imageUrl && <Box component={Card} boxShadow={4} height={1} width={1}>
            <Box
              component={CardMedia}
              height={1}
              width={1}
              minHeight={400}
              image={imageUrl}
              
              style={{ objectFit: 'cover', backgroundPositionY: '30%', transition: 'background-image .5s' }}
            />
          </Box>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Bio;
