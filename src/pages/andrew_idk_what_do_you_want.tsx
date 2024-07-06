import { Button } from "@mui/material";
import Link from "next/link";
import Layout from "../Layout";

const Andrew = () => {
  return (
    <Layout colorInvert={false}>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20vh' }}>
        <div style={{ maxWidth: '70vw', border: '2px #222 solid', padding: '20px', borderRadius: '10px', paddingTop: '2%' }}>
          💰 Альфа-Банк дарит 3000₽ всем гарантированно 
          <br /><br />
          Только до 14.07
          <br />
          <br />1. Переходим по ссылке
          <br />2. Открываем первый брокерский счёт в Альфа-Банке до 14.07
          <br />3. Покупаем ЛЮБЫЕ ценные бумаги от 1000₽, их можно потом продать или сохранить
          <br />
          <br />🎁 3000₽ начислят на счёт до 15.08 всем новым клиентам Альфа-Банк Инвестиции
        </div>
        <br /><br />
        <Link href="https://unicom24.ru/offer/rs/3u6czpmyzko4w?partner=214053&erid=Kra243H2c&platform_id=10307" passHref >
          <Button variant="outlined" style={{ maxWidth: '70vw', fontSize: '1.5rem', borderColor: 'black', borderWidth: '3px', display: 'block' }} type="submit">Это кнопка чтобы куда-то перейти</Button>
        </Link>
        <br /><br />
        меня попросили (бесплатно)
      </div>
    </Layout>
  );
};

export default Andrew;
