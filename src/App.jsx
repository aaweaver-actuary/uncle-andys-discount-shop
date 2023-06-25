import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar.component';
import Home from './components/routes/home/Home.component';
import SignIn from './components/routes/sign-in/sign-in.component';

import './App.css';

const Shop = () => <h1>Shop</h1>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
