import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../componentes/Home/Home'));
const ErrorPage = lazy(() => import('../componentes/ErrorPage/errorpage'));
const LoginPage = lazy(() => import('../componentes/login/login'));
const RegisterPage = lazy(() => import('../componentes/register/register'));
const ExtensePage = lazy(
  () => import('../componentes/ExtensePost/ExtensePost')
);
const CreatePost = lazy(() => import('../componentes/CreatePost/CreatePost'));
const EditPost = lazy(() => import('../componentes/EditPost/EditPost'));
const MyPosts = lazy(() => import('../componentes/MyPosts/MyPosts'));

export const AppRouter = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/*" element={<ErrorPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/post/:id" element={<ExtensePage />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/myposts" element={<MyPosts />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>
      </Routes>
    </Suspense>
  );
};
