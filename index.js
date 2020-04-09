import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('stay_home_lk', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('stay_home_lk', { rootTag });
}
