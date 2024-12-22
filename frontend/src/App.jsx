import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FetchContent from './pages/FetchContent'; // 追加
import './styles/App.css'; // 全体のスタイリングを読み込み

// 共通レイアウト
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="main-content">{children}</div>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/fetch-content',
    element: (
      <Layout>
        <FetchContent />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
