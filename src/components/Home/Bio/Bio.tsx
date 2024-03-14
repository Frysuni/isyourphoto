import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Container } from "@mui/material";
import { fetchGallery } from "../../../lib/fetchGallery";
import { useEffect, useState } from "react";

const Bio = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);
      const images: string[] = [];
      (await fetchGallery()).forEach(collection => {
        collection.images.forEach(image => images.push(image));
      });
      const shuffled = shuffle(images)
      setImageUrls(shuffled.slice(0, shuffled.length / 6));
    };

    loadImages();
  }, []);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imageUrls.map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = imageUrl;
          image.onload = resolve;
          image.onerror = reject;
        });
      });
      await Promise.race(imagePromises);
      
    };

    preloadImages();
  }, [imageUrls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imageUrls]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box component='div' mb={3}>
            <Typography variant="h5" color="text.secondary">
              Запечатлю мгновения во веках, превращая их в вечные картины вашей души.
            </Typography>
          </Box>
            <Grid container spacing={2}>
              <Grid item xs={16} md={20}>
                <Box component='div' display="flex" sx={{ gap: 1.75 }} flexDirection={'column'}>
                  <Link href="/work" passHref>
                    <Button variant="outlined" style={{ fontSize: '2rem'}}>
                      <Box
                        component="img"
                        src={"/images/main-icon.png"}
                        alt="Icon"
                        width={50}
                        height={50}
                        mr={0.6}
                      />
                      Галерея
                    </Button>
                  </Link>
                  <Link href="https://t.me/bbymcqueen" passHref>
                    <Button variant="outlined" style={{ fontSize: '1.8rem', borderColor: 'black', borderWidth: '3px' }} type="submit">Я тоже хочу фотку!</Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          {imageUrls.length > 0 && (
            <Box component={Card} boxShadow={4} height={1} width={1}>
              <Box
                component={CardMedia}
                height={1}
                width={1}
                minHeight={400}
                style={{
                  backgroundImage: `url(${imageUrls[currentImageIndex]})`,
                  objectFit: 'cover',
                  backgroundPositionY: '30%',
                  transition: 'background-image 0.3s',
                }}
              >{" "}</Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Bio;
