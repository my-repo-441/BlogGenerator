import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from "./context/AppContext";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FetchContent from './pages/FetchContent';
import './styles/App.css';

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
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
