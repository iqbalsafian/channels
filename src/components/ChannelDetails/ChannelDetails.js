import axios from 'axios';
import { useEffect, useState } from 'react';
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
  return (
    <div className="channel-details-container">
      <table className="table table-hover table-condensed table-striped table-responsive">
        <tbody>
          <tr>
            <td>Title</td>
            <td>{channelDetailsData?.title}</td>
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
        </tbody>
      </table>
    </div>
  );
};

export default ChannelDetails;
