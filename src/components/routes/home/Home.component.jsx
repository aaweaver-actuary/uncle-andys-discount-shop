import Categories from '../../Categories.component';
import { Outlet } from 'react-router';

import './Home.styles.css';

const Home = () => {
  return (
    <main className="flex flex-col text-center">
      <h1>{"UNCLE ANDY'S DISCOUNT SHOP"}</h1>
      <h2 className="home-subheading">
        the goods are cheap, just don&apos;t ask how
      </h2>
      <Outlet />
      <Categories />
    </main>
  );
};

export default Home;
