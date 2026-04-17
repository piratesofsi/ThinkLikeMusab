import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import Navbar from "./components/Navbar";
import Post from "./pages/Posts";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <BrowserRouter>
      <div className="bg-black text-white min-h-screen">
          {/* toaster  */}
          <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid #333",
            },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<Post/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;