import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import Navbar from "./components/Navbar";
import Post from "./pages/Posts";
import { Toaster } from "react-hot-toast";
import Categories from "./pages/Categories";
import Contribute from "./components/Contribute";
import ContributePage from "./pages/Contribute";
import Admin from "./pages/Admin";

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
          <Route path="/Categories" element={<Categories />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;