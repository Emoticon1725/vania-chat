import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./pages/NotFound"; // Add this import

function App() {

  return (
    <Router>
    <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ChatRoom />
          </PrivateRoute>
        }
      />
    </AuthProvider>
    </Router>
    
    
    
    
  )
}

export default App
