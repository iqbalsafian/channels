import React, { useState } from 'react';
import './Buttons.scss';

const Buttons = ({ sortChannels, searchChannel }) => {
  const [searchText, setSearchText] = useState('');
  const [sortedBy, setSortedBy] = useState('');
  const [sortedType, setSortedType] = useState('');

  const handleSort = (orderBy, orderType) => {
    sortChannels(orderBy, orderType);
    setSortedBy(orderBy);
    setSortedType(orderType);
  };
  
  const sortButton = () => {
    return (
      <label className="dropdown">
        <div className="dd-button">Sort</div>
        <input type="checkbox" className="dd-input" />
        <ul className="dd-menu">
          <li onClick={() => handleSort('title', 'asc')}>
            by Name ascending
            {
              (sortedBy === 'title') && (sortedType === 'asc') && <span className="checkmark" />
            }
          </li>
          <li onClick={() => handleSort('title', 'desc')}>
            by Name descending
            {
              (sortedBy === 'title') && (sortedType === 'desc') && <span className="checkmark" />
            }
          </li>
          <li onClick={() => handleSort('stbNumber', 'asc')}>
            by Channel ascending
            {
              (sortedBy === 'stbNumber') && (sortedType === 'asc') && <span className="checkmark" />
            }
          </li>
          <li onClick={() => handleSort('stbNumber', 'desc')}>
            by Channel descending
            {
              (sortedBy === 'stbNumber') && (sortedType === 'desc') && <span className="checkmark" />
            }
          </li>
        </ul>
      </label>
    )
  };

  const searchArea = () => {
    return (
      <div>
        <input style={{marginLeft: '-60px', paddingRight: '10px'}} type="text" size="5" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <button style={{marginLeft: '10px'}} type="button" onClick={() => searchChannel(searchText)}>Search</button>
      </div>
    )
  };

  return (
    <div className="buttons-container">
      <div style={{float: 'left'}}>{ sortButton() }</div>
      <div>{ searchArea() }</div>
    </div>
  )
};

export default Buttons;
