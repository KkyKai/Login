import './App.css';
import PageRoutes from "./routes/PageRoutes";
import React from 'react';
import { AuthProvider } from "./pages/AuthContext"; // Import the AuthProvider

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PageRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
