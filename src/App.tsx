import { Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';

function App() {
  return (
    <main className='flex min-h-screen justify-center bg-gray-100'>
      <div className='container mx-4'>
        <Routes>
          <Route path='/' element={<div>Home</div>} />

          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
