import Categories from '../../Categories.component';
import { Outlet } from 'react-router';

const Home = () => {
  return (
    <main className="flex flex-col text-center">
      <h1>{"UNCLE ANDY'S DISCOUNT SHOP"}</h1>
      <h2 className="italic">{"the goods are cheap, just don't ask how"}</h2>
      <h1>THIS IS A NEW FEATURE</h1>
      <Outlet />
      <Categories />
    </main>
  );
};

export default Home;
