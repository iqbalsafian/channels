import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getChannels } from "../../redux/actions/channels";
import Buttons from './Buttons';
import './Channels.scss';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels);
  const [orderBy, setOrderBy] = useState('title');
  const [channelList, setChannelList] = useState(channels);

  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    dispatch(getChannels);
  }, [dispatch]);

  const sortChannels = (orderBy, orderType) => {
    const sorted = [...channels].sort((a, b) => {
      if (orderType === 'asc') return a[orderBy] - b[orderBy];
      else return b[orderBy] - a[orderBy];
    });
    console.log(sorted);
    setChannelList(sorted);
  };

  const displayChannels = (page) => {
    const displayCurrentSchedule = (currentSchedule) => {
      return (
        currentSchedule
        && currentSchedule.map((schedule, index) => {
          return (
            <div key={schedule?.eventId} className="text-left pad">
              {schedule?.title}
            </div>
          );
        })
      )
    };

    return (
      channelList
      && channelList.map(channel => {
        return (
          <div key={channel?.id} className="flex-table row" role="rowgroup">
            <div className="flex-row first" role="cell">
                <NavLink to={`/channel-details/${channel?.id}`}>
                  {channel?.title}
                </NavLink>
                <div className="favorite-container">
                  <button onClick={() => alert(1)}>
                    Add to favourite
                  </button>
                </div>
              </div>
            <div className="flex-row" role="cell">{channel?.stbNumber}</div>
            <div className="flex-row" role="cell">{displayCurrentSchedule(channel?.currentSchedule)}</div>
          </div>
        );
      })
    );
  };

  return (
    <div className="channel-container">
      <Buttons sortChannels={sortChannels} />
      <div className="table-container" role="table" aria-label="channels">
        <div className="flex-table header" role="rowgroup">
        <div className="flex-row first" role="columnheader">Channel</div>
        <div className="flex-row number" role="columnheader">Number</div>
        <div className="flex-row" role="columnheader">Current Schedule</div>
        </div>
      </div>
      {
        displayChannels()
      }
    </div>
  );
};

export default Channels;

