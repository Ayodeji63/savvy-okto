import { useState } from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';

import LandingPage from "./Landing";
import AuthContextProvider from './context/AuthContext';
import DashboardPage from './dashboard/dashboard/page';
import DepositPage from './group-savings/page';

const OKTO_CLIENT_API_KEY = import.meta.env.VITE_OKTO_CLIENT_API_KEY;
console.log("Okto API KEY is %s", OKTO_CLIENT_API_KEY);

function App() {
  console.log('App component rendered');
  const [authToken, setAuthToken] = useState(null);
  const handleLogout = () => {
    console.log("setting auth token to null")
    setAuthToken(null); // Clear the authToken
  };
  return (
    <Router>
      <AuthContextProvider>
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY ?? ""} buildType={BuildType.SANDBOX}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout} />} />
            <Route path='/dashboard/dashboard/page' element={<DashboardPage />} />
            <Route path='/group-savings/page' element={<DepositPage />} />
            {/* <Route path="/home" element={authToken ? <HomePage authToken={authToken} handleLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/raw" element={authToken ? <RawTxnPage authToken={authToken} handleLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/widget" element={authToken ? <WidgetPage authToken={authToken} handleLogout={handleLogout} /> : <Navigate to="/" />} /> */}
          </Routes>
        </OktoProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;