import axios from 'axios';
import moment from 'moment';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ChannelDetails.scss';

const ChannelDetails = ({ match }) => {
  const [channelDetailsData, setChannelDetailsData] = useState();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`https://contenthub-api.eco.astro.com.my/channel/${match.params.id}.json`);
        setChannelDetailsData(res.data.response);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, [match.params.id]);

  console.log(channelDetailsData);

  const renderSchedule = (schedule) => {
    if (schedule) {
      return Object.entries(schedule).map(([theDate, theEvents]) => {
        return (
          <div className="text-center">
            <div className="tabs">
              <div className="tab">
                <input type="checkbox" id={`chk_${theDate}`} />
                <label className="tab-label" htmlFor={`chk_${theDate}`}>{theDate}</label>
                <div className="tab-content">
                  {
                    theEvents.map(tEvent => {
                      return (
                        <div key={tEvent.eventId} className="text-left">
                          <div>
                            {moment(tEvent.datetimeInUtc).format("HH:mm")}&nbsp;
                            - {tEvent.title}
                          </div>
                          <div></div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        );
      })
    }
  };

  return (
    <div className="channel-details-container">
      <div className="back-link">
        <NavLink to="/">Back to channel list</NavLink>
      </div>
      <table className="table table-hover table-condensed table-striped table-responsive">
        <tbody>
          <tr>
            <td>Title</td>
            <td>{channelDetailsData?.title} { channelDetailsData?.isHd && "(HD)"}</td>
          </tr>
          <tr>
            <td>STB Number</td>
            <td>{channelDetailsData?.stbNumber}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{channelDetailsData?.category}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{channelDetailsData?.description}</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>{channelDetailsData?.language}</td>
          </tr>
          <tr>
            <td style={{verticalAlign: 'text-top'}}>Schedule</td>
            <td>
              {
                renderSchedule(channelDetailsData?.schedule)
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChannelDetails;
