import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getChannels } from "../../redux/actions/channels";
import Buttons from './Buttons';
import './Channels.scss';

const Channels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannels);
  }, [dispatch]);
  
  const channels = useSelector(state => state.channels);
  const [channelList, setChannelList] = useState();
  const [favouriteList, setFavouriteList] = useState();

  useEffect(() => {
    setChannelList(channels);
  }, [channels]);

  useEffect(() => {
    const getter = localStorage.getItem('favourites');
    if (getter)
      setFavouriteList(JSON.parse(getter));
  }, []);

  const sortChannels = (orderBy, orderType) => {
    const sorted = [...channels].sort((a, b) => {
      if (orderType === 'asc') {
        if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) return -1
        else if (a[orderBy].toLowerCase() > b[orderBy].toLowerCase()) return 1;
        else return 0;
      } else {
        if (a[orderBy].toLowerCase() > b[orderBy].toLowerCase()) return -1
        else if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) return 1;
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

  const addFavorite = async channelId => {
    const getter = JSON.parse(localStorage.getItem('favourites'));
    if (getter) {
      getter.push(channelId);
      await localStorage.setItem("favourites", `[${getter}]`);
      setFavouriteList(JSON.parse(localStorage.getItem("favourites")));
    } else {
      await localStorage.setItem("favourites", `[${channelId}]`);
      setFavouriteList(JSON.parse(localStorage.getItem("favourites")));
    }
  };

  const removeFavourite = async channelId => {
    const getter = JSON.parse(localStorage.getItem('favourites'));
    const indexNumber = getter.indexOf(channelId);
    getter.splice(indexNumber, 1);
    await localStorage.setItem("favourites", `[${getter}]`);
    setFavouriteList(getter);
  }

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
                    (!favouriteList?.includes(channel?.id))
                    && (
                      <button onClick={() => addFavorite(channel?.id)}>
                        Add to favourite
                      </button>
                    )
                  }
                  {
                    favouriteList?.includes(channel?.id)
                    && (
                      <button onClick={() => removeFavourite(channel?.id)}>
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

