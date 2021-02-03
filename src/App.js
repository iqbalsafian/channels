import './App.css';
import { Route, Switch } from 'react-router-dom';
import Channels from './components/Channels';
import ChannelDetails from './components/ChannelDetails';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/channel-details/:id" exact component={ChannelDetails} />
        <Route path="" exact component={Channels} />
      </Switch>
    </div>
  );
}

export default App;
