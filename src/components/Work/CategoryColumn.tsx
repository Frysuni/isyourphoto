import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GalleryManifest } from "../../utils/fetchGallery";

interface CategoryColumnProps {
  category_data: GalleryManifest[];
}

const Column = ({ category }: { category: GalleryManifest }) => {
  return (
    <Link href={`/work/${category.code}`} style={{ height: '100%', display: 'block' }} passHref>
      <Box component="a" style={{ height: '100%', display: 'block' }}>
        <Box
          boxShadow={1}
          style={{ height: '100%', display: 'block' }}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 1,
            "&:hover": {
              "& img": {
                transform: "scale(1.3)",
              },
            },
          }}
        >
          <Box
            component="img"
            height={1}
            width={1}
            src={category.images[0]}
            alt={`Loading: ${category.caption}`}
            maxHeight={{ xs: 300, sm: 600, md: 1 }}
            minHeight={{ sm: 600 }}
            style={{ height: '100%', display: 'block' }}
            sx={{
              transition: "transform .7s ease !important",
              transform: "scale(1.1)",
              objectFit: "cover",
              filter: "brightness(0.8)",
            }}
          />
          <Box position="absolute" bottom={0} left={0} right={0} padding={3}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {category.caption}
              </Typography>
              <Box
                component="img"
                src="/images/main-icon.png"
                alt="Icon"
                width={40}
                height={40}
                sx={{
                  transition: "transform .7s ease !important",
                  filter:
                    "invert(100%) sepia(100%) saturate(0%) hue-rotate(152deg) brightness(160%) contrast(103%)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

const CategoryColumn = ({ category_data }: CategoryColumnProps) => {
  return (
    <Box>
      <Grid container spacing={4} style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
      }}>
        {category_data.map(c => {
          return (
            <Grid key={c.code} item xs={12} md={4}>
              <Column category={c}/>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
};

export default CategoryColumn;
