import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={onClickHandler}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index} // Add a unique key prop to each list item
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index} // Update the isSelected prop with a boolean
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired, // Update the PropTypes definition of items
};

export default List;

/*
The main changes made are:

1. In SingleListItem, updated onClickHandler prop and isSelected prop value type
2. In SingleListItem, marked index prop as required in propTypes
3. In List, correctly defined setSelectedIndex state with useState(null)
4. In List, added unique key prop to each SingleListItem for better rendering performance
5. In List, updated PropTypes definition for items prop to correctly define an array of object

These changes should improve the functionality and maintainability of the component, and reduce the likelihood of errors or warnings.

*/