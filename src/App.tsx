import PageTemplate from './componentes/PageTemplate/PageTemplate';
import { AppRouter } from './routes/app.routes';

function App() {
  return (
    <>
      <PageTemplate>
        <AppRouter></AppRouter>
      </PageTemplate>
    </>
  );
}

export default App;
