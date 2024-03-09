/* eslint-disable react/no-unescaped-entities */
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Grid, IconButton, Typography } from "@mui/material/";
import theme from "../../theme";

const Contact = ({ description }: { description: string }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item container direction="column">
        <Grid item mb={1}>
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            fontWeight="bold"
            mb={2}
          >
            Contact
          </Typography>

          <Typography variant="h5" color="primary">
            {description}
          </Typography>
        </Grid>
        <Grid item container direction="row" alignSelf="center" spacing='20%' py='8%'>
          <Grid item>
            <IconButton
              aria-label="instagram"
              href="https://www.instagram.com/direct/t/17842699262517494"
              target="_blank"
              disableRipple
              sx={{
                color: theme.palette.primary.main,
                ":hover": "#f9f9f9",
              }}
            >
              <InstagramIcon
                fontSize="large"
                style={{ transform: "scale(300%)", border: 'solid 1px #00A' }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="telegram"
              href="https://t.me/bbymcqueen"
              target="_blank"
              disableRipple
              sx={{
                color: theme.palette.primary.main,
                ":hover": "#f9f9f9",
                
                
              }}
            >
              <TelegramIcon
                fontSize="large"
                style={{ transform: "scale(300%)", border: 'solid 1px #00A' }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
