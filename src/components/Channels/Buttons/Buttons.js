import React from 'react';
import { useDispatch } from 'react-redux';
import { sortChannels } from '../../../redux/actions/channels';
import './Buttons.scss';

const Buttons = ({ sortChannels }) => {
  // const dispatch = useDispatch();
  
  const sortButton = () => {
    return (
      <label className="dropdown">
        <div className="dd-button">Sort</div>
        <input type="checkbox" className="dd-input" />
        <ul className="dd-menu">
          <li onClick={() => sortChannels('title', 'asc')}>by Name ascending</li>
          <li onClick={() => sortChannels('title', 'desc')}>by Name descending</li>
          <li onClick={() => sortChannels('stbNumber', 'asc')}>by Channel ascending</li>
          <li onClick={() => sortChannels('stbNumber', 'desc')}>by Channel descending</li>
          {/* <li onClick={() => setField('stbNumber')}>by Channel Number</li> */}
        </ul>
      </label>
    )
  };

  const searchArea = () => {
    return (
      <div>
        <input type="text" size="5" onChange={e => {}} />
        <button type="button">Search</button>
      </div>
    )
  };

  return (
    <div className="buttons-container">
      { sortButton() }
      { searchArea() }
    </div>
  )
};

export default Buttons;
