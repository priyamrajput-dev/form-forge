import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SidebarLayout from './components/SidebarLayout';

import FormBuilder from './pages/FormBuilder';
import FormView from './pages/FormView';
import FormResponses from './pages/FormResponses';

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-black text-white font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/f/:id" element={<FormView />} />
          
          <Route path="/dashboard" element={<SidebarLayout><Dashboard /></SidebarLayout>} />
          <Route path="/forms/:id/edit" element={<SidebarLayout><FormBuilder /></SidebarLayout>} />
          <Route path="/forms/:id/responses" element={<SidebarLayout><FormResponses /></SidebarLayout>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
