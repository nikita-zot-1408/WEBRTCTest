import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {ContextProvider} from './src/context/VideoContext';

AppRegistry.registerComponent(appName, () => App);
