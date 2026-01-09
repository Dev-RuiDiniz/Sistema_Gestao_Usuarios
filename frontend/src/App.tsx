import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Importe aqui
import { AuthLayout } from './components/layouts/AuthLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';

export default function App() {
  return (
    <BrowserRouter>
      {/* O Provider deve envolver toda a estrutura de rotas */}
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<div>Tela de Login</div>} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}