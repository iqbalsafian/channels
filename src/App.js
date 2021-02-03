import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Channels from './components/Channels';
import ChannelDetails from './components/ChannelDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/channel-details/:id" exact component={ChannelDetails} />
        <Route path="" exact component={Channels} />
      </Switch>
    </div>
  );
}

export default App;
