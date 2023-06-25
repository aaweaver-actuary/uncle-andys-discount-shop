import Category from './categories/Category.component';
import categoryData from './categories/category.data';
import './categories/Categories.styles.css';

const Categories = () => {
  return (
    <div>
      <ul className="categories-grid">
        {categoryData.map(({ id, ...otherCategoryProps }) => (
          <li
            key={id}
            className={`p-4 category-item categories-${otherCategoryProps[
              'name'
            ].toLowerCase()}`}
            style={{ backgroundImage: `url(${otherCategoryProps['image']})` }}
          >
            <Category key={id} {...otherCategoryProps} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
