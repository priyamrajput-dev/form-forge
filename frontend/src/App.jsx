import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import FormBuilder from './pages/FormBuilder';
import FormView from './pages/FormView';
import FormResponses from './pages/FormResponses';

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forms/:id/edit" element={<FormBuilder />} />
          <Route path="/forms/:id/responses" element={<FormResponses />} />
          <Route path="/f/:id" element={<FormView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
