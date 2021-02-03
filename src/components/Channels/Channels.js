import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { addToFavorite, getChannels, removeFromFavourite } from "../../redux/actions/channels";
import Buttons from './Buttons';
import './Channels.scss';

const Channels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannels);
  }, [dispatch]);
  
  const channels = useSelector(state => state.channels);
  const favourites = useSelector(state => state.favourites);
  const [channelList, setChannelList] = useState();
  console.log(channelList);

  useEffect(() => {
    setChannelList(channels);
  }, [channels]);


  const sortChannels = (orderBy, orderType) => {
    const sorted = [...channels].sort((a, b) => {
      if (orderType === 'asc') {
        if (a[orderBy] < b[orderBy]) return -1
        else if (a[orderBy] > b[orderBy]) return 1;
        else return 0;
      } else {
        if (a[orderBy] > b[orderBy]) return -1
        else if (a[orderBy] < b[orderBy]) return 1;
        else return 0;
      }
    });
    setChannelList(sorted);
  };

  const searchChannel = (searchText) => {
    const searched = [...channels].filter(channel => {
      if (searchText !== '')
        return (channel.title === searchText || channel.stbNumber === searchText)
      return channel;
    });
    setChannelList(searched);
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
      channelList && channelList.map(channel => {
        return (
          <div key={channel?.id} className="flex-table row" role="rowgroup">
            <div className="flex-row first" role="cell">
                <NavLink to={`/channel-details/${channel?.id}`}>
                  {channel?.title}
                </NavLink>
                <div className="favorite-container">
                  {
                    !favourites.includes(channel?.id)
                    && (
                      <button onClick={() => dispatch(addToFavorite(channel?.id))}>
                        Add to favourite
                      </button>
                    )
                  }
                  {
                    favourites.includes(channel?.id)
                    && (
                      <button onClick={() => dispatch(removeFromFavourite(channel?.id))}>
                        Remove from favorite
                      </button>
                    )
                  }
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
      <Buttons sortChannels={sortChannels} searchChannel={searchChannel} />
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

