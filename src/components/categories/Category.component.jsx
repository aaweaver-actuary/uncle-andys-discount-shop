import propTypes from 'prop-types';

const Category = ({ name, text, linkURL }) => {
  return (
    <div className="category-text-box" href={linkURL}>
      {/*<img src={image} alt={name} width={100} height={100} />*/}
      <h2 className="text-xl font-bold ">{name}</h2>
      <p>{text}</p>
    </div>
  );
};

Category.propTypes = {
  name: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  // image: propTypes.string.isRequired,
  linkURL: propTypes.string.isRequired,
};

export default Category;
