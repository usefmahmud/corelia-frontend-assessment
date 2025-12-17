import { Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import ProtectedRoute from './components/guards/protected-route';
import AuthRoute from './components/guards/auth-route';

function App() {
  return (
    <main className='flex min-h-screen justify-center bg-gray-100'>
      <div className='container mx-4'>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <div>Home</div>
              </ProtectedRoute>
            }
          />

          <Route element={<AuthRoute />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
