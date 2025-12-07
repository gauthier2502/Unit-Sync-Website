import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { BookDemo } from './pages/BookDemo';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white selection:bg-[#2E5BFF] selection:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-demo" element={<BookDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
