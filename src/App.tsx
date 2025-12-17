import { Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';

function App() {
  return (
    <main className='flex min-h-screen justify-center bg-gray-100'>
      <div className='container mx-4'>
        <Routes>
          <Route path='/' element={<div>Home</div>} />

          <Route path='/login' Component={LoginPage} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
