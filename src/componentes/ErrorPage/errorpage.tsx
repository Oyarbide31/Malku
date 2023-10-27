import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <>
      <h1>¡TENEMOS BUENAS Y MALAS NOTICIAS PARA TI!</h1>
      <br />
      <p>
        Primero, lo malo: esta pagina no existe. <br /> Y ahora, la buena
        noticia es que lo que quieras, puedes encontrarlo en:{' '}
        <Link to="/">Link</Link>
      </p>
      <img src="/AdamOndraFail.gif" alt="AdamOndra Fail pag Error" />
    </>
  );
}
