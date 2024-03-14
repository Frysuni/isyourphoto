import type { GetStaticProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import Layout from "../../Layout";
import { Statement, CategoryColumn } from "../../components/Work";
import { GalleryManifest } from "../../types/gallery";
import { fetchGallery } from "../../lib/fetchGallery";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { useEffect, useRef, useState } from "react";

interface APICall {
  gallery: GalleryManifest[];
}
const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);
let texts = shuffle([
  "Путешествие в мир изумительных моментов: мои фотографии, моя история",
  "Открой для себя красоту и эмоции: моя коллекция фотографий",
  "Магия мгновений: увлекательное погружение в мой мир фотографий",
  "Приветствие в захватывающий мир кадров: истории, рассказанные моим объективом",
  "Отражение эмоций: моя фотографическая галерея историй и чувств",
  "Освещение эмоций: мои восхитительные моменты в объективе",
  "Искусство захватить момент: мои фотографии, которые вдохновляют и оживляют",
  "Путешествие в мир красоты и вдохновения: мои волшебные кадры и впечатления",
  "Истории, рассказанные в каждом кадре: погружение в мои фотографии",
  "Мои фотографии - это история, мир, вдохновение и воспоминания в каждом кадре",
  "Эмоциональное путешествие в мир моего взгляда: коллекция моих впечатлений",
  "Освещение красоты: истории и моменты в объективе моей души",
  "Искусство захвата души: мои фотографии, пронизанные вдохновением",
  "Путеводитель по волшебному миру моих воспоминаний: моя фотогалерея",
  "Отражение красоты: моя коллекция фотографий, переплетённая эмоциями",
  "Путешествие сквозь эмоциональный ландшафт: мой мир фотографий и впечатлений",
  "Искусство сохранить момент: моя фотографическая книга воспоминаний",
  "Сияние в объективе: мои эмоциональные фотографии и моменты прозрения",
  "Фотографические визуальные поэмы: истории, рассказанные моими объективами",
  "Захватывающие мгновения: моя фотографическая история в цвете и эмоции",
])

const Work = ({ gallery }: APICall) => {
  const [index, setIndex] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const textRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeEffect = () => {
      if (textRef.current < texts[index].length) {
        setText((prevText) => prevText + texts[index].charAt(textRef.current));
        textRef.current += 1;
        timerRef.current = setTimeout(typeEffect, 40); // Скорость печати (задержка между буквами)
      } else {
        timerRef.current = setTimeout(eraseEffect, 1000); // Задержка перед стиранием текста
      }
    };

    const eraseEffect = () => {
      if (textRef.current > 0) {
        setText((prevText) => prevText.slice(0, -1));
        textRef.current -= 1;
        timerRef.current = setTimeout(eraseEffect, 20); // Скорость стирания (задержка между буквами)
      } else {
        
        setIndex((prevIndex) => {
          if (prevIndex + 1 === texts.length) {
            texts = shuffle(texts);
            return 0;
          }
          return prevIndex + 1;
        }); // Переход к следующему тексту
        timerRef.current = setTimeout(typeEffect, 500); // Задержка перед началом печати следующего текста
      }
    };

    timerRef.current = setTimeout(typeEffect, 1000); // Задержка перед началом печати первого текста

    return () => {
      clearTimeout(timerRef.current!); // Очистка таймера при размонтировании компонента
    };
  }, [index]);

  const spanStyles = (): CSSProperties => ({
    textAlign: "center",
    margin: "3vh auto",
    display: "block",
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
      paddingTop="10vh"
    >
      <Layout title="IsYourPhoto | Галерея">
        <Container maxWidth="lg">
        <Box maxWidth="lg" margin="auto" style={{ minHeight: 'calc(200px - 5vw)' }}>
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            fontWeight="bold"
            mb={2}
          >Галерея</Typography>
          <Typography variant="h6" color="primary" mb={4}>
            {text}
          </Typography>
        </Box>
          <CategoryColumn category_data={gallery} />
          <span style={spanStyles()}>All information is automatically received from
            <a href="https://www.instagram.com/isyourphoto/" target="_blank" rel="noreferrer"> Instagram (IsYourPhoto, Ksyu)</a>
            , all rights are delegated
          </span>
        </Container>
      </Layout>
    </Box>
  );
};

export default Work;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      gallery: await fetchGallery(),
    },
    revalidate: 300,
  };
};
