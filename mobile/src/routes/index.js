import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from '../pages/Home.page'
import LandingPage from '../pages/Landing.page'

const AppNavigator = createStackNavigator({
  Landing: {
    screen: LandingPage
  },
  Home: {
    screen: HomePage
  }
},{
  headerMode: 'none'
});

const AppContainer = createAppContainer(AppNavigator);

export default createAppContainer(AppContainer)
