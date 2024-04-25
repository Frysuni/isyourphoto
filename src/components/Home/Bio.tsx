import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Container } from "@mui/material";
import { fetchGallery } from "../../utils/fetchGallery";
import { useEffect, useRef, useState } from "react";
import { randomElement } from "../../utils/randomElement";

const texts = [
  "Снимаю мир глазами души: красота в деталях, вдохновение в каждом кадре.",
  "Фиксирую мгновения, которые переполняют сердце. Мои фотографии — отражение эмоций и страстей.",
  "Искусство в каждом кадре: игра света, тени и формы, оживающие под моим объективом.",
  "Мой фотоальбом — это путешествие в мир фантазии, где реальность сливается с мечтами.",
  "Фотографии, наполненные жизнью и смыслом, созданные с любовью к красоте и творчеству.",
  "Захватываю уникальные моменты жизни, оставляя след в сердцах и в памяти каждого, кто видит мои работы.",
  "Каждый кадр — это история, рассказанная через объектив, с любовью к деталям и вниманием к эмоциям.",
  "Мое видение мира — это композиция из красок, форм и текстур, воплощенная в каждой фотографии.",
  "Фотографии, которые заставляют задуматься, мечтать и вдохновляют на новые открытия.",
  "Творческий взгляд на привычные вещи: обыденность превращается в искусство под моим объективом.",
  "В каждом кадре — история. Откройте мир через мои объективы.",
  "Искусство видеть необычное в обыденном. Добро пожаловать в мою галерею.",
  "Фотография как поэзия света. Загляните в моё воображение.",
  "За гранью привычного — мир, который я вижу. Приглашаю вас на его исследование.",
  "Создаю визуальные эмоции. Переживите их вместе со мной.",
  "Творчество без границ. Каждый снимок — это приключение.",
  "Мгновения, остановленные временем. Откройте вместе со мной красоту мгновенного.",
  "Исследуйте мир через мой объектив. С каждым кадром вы увидите больше.",
  "Фотография — мой язык. Слушайте его визуально.",
  "Живите моментами, которые я запечатлел для вас.",
  "Каждый кадр — отражение души. Позвольте мне показать вам его суть.",
  "В поисках идеального момента. Присоединяйтесь к моему путешествию.",
  "Фотография — это магия реальности. Делюсь этой магией с вами.",
  "Зрительные истории, рассказанные светом. Откройте их для себя.",
  "Мои фотографии — это врата в другие миры. Шагните через них.",
  "Через объектив я говорю с миром. Послушайте мои визуальные рассказы.",
  "Каждое изображение — путь к новому открытию. Исследуйте его со мной.",
  "Открываю сердце миру через каждый снимок. Приглашаю вас почувствовать это.",
  "Фотография как исследование — каждый кадр открывает новые горизонты.",
  "Снимаю мир таким, каким его вижу — полным чудес и открытий.",
];

const Bio = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const text = useRef(randomElement(texts));

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
    const preloadImage = (index: number) => new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageUrls[index];
      image.onload = resolve;
      image.onerror = reject;
    })
  
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const currentIndex = (prevIndex + 1) % imageUrls.length;
        const nextIndex = (currentIndex + 1) % imageUrls.length;
        preloadImage(nextIndex);
        return currentIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [imageUrls]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box component='div' mb={3}>
            <Typography variant="h5" color="text.secondary" pt='10%'>
              {text.current}
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
                    <Button variant="outlined" style={{ fontSize: '1.5rem', borderColor: 'black', borderWidth: '3px' }} type="submit">Я тоже хочу фотку!</Button>
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
