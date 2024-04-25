import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme, Button, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";

interface NavLinksProps {
  handleClose: () => void;
  pages: { title: string, path: string }[];
  colorInvert: boolean;
}

const NavLinks = ({ pages, handleClose, colorInvert }: NavLinksProps) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      {pages.map(({ title, path }, i) => (
        <Link href={path} passHref key={i}>
          <Button
            component="a"
            color="primary"
            disableRipple
            onClick={handleClose}
            sx={{
              ...(router.pathname === path && { fontWeight: "bold" }),
              color: !colorInvert ? theme.palette.primary.main : "#f9f9f9",
              "&:hover": {
                backgroundColor: "transparent",
                fontWeight: "bold",
              },
            }}
          >
            {title}
          </Button>
        </Link>
      ))}
      <IconButton
        aria-label="instagram"
        href="https://www.instagram.com/isyourphoto/"
        target="_blank"
        onClick={handleClose}
        disableRipple
        sx={{
          color: !colorInvert ? theme.palette.primary.main : "#f9f9f9",
        }}
      >
        <InstagramIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="telegram"
        href="https://t.me/ksyunherocean"
        target="_blank"
        onClick={handleClose}
        disableRipple
        sx={{
          color: !colorInvert ? theme.palette.primary.main : "#f9f9f9",
        }}
      >
        <TelegramIcon fontSize="small" />
      </IconButton>
    </>
  );
};

export default NavLinks;
