import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Container, StyleProvider } from 'native-base';
import * as Font from 'expo-font';
import * as Network from 'expo-network';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import ErrorView, { ERROR_CODES } from './screens/ErrorView';
import SuccessView, { SUCCESS_CODES } from './screens/SuccessView';
import Router from './screens/Router'

const style = {
  paddingTop: 0
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      networkState: {
        isConnected: false,
        isInternetReachable: false,
        submissionError:false,
        submissionCompleted:false,
        logoutCompleted:false,
        logoutError:false
      } 
    };

    this.handleSubmissionError= this.handleSubmissionError.bind(this);
    this.handleSubmissionCompleted= this.handleSubmissionCompleted.bind(this);
    this.logoutError= this.logoutError.bind(this);
    this.logoutCompleted=this.logoutCompleted.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      ...MaterialCommunityIcons.font
    });
    const {isConnected, isInternetReachable} = await Network.getNetworkStateAsync();
    this.setState({ 
        isReady: true,
        networkState: {
            isConnected,
            isInternetReachable
        }
      });
  }

  handleSubmissionError(){
    this.setState({submissionError:true, submissionCompleted:false});
    setTimeout(()=>this.setState({submissionError:false}), 2000);
  }

  handleSubmissionCompleted(){
    this.setState({submissionError:false, submissionCompleted:true});
    setTimeout(()=>this.setState({submissionCompleted:false}), 2000);
  }

  logoutCompleted(){
    this.setState({logoutError:false, logoutCompleted:true});
    setTimeout(()=>this.setState({logoutCompleted:false}), 2000);
  }
  
  logoutError(){
    this.setState({logoutError:true, logoutCompleted:false});
    setTimeout(()=>this.setState({logoutError:false}), 2000);
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    if(!this.state.networkState.isConnected){
      return <ErrorView type={ERROR_CODES.NO_NETWORK}/>
    }

    if(!this.state.networkState.isInternetReachable){
      return <ErrorView type={ERROR_CODES.NO_INTERNET}/>
    }

    if(this.state.submissionError){
      return <ErrorView type={ERROR_CODES.SUBMIT_ERROR}/>
    }

    if(this.state.submissionCompleted){
      return <SuccessView type={SUCCESS_CODES.SUBMITTED}/>
    }

    if(this.state.logoutError){
      return <ErrorView type={ERROR_CODES.LOGOUT_ERROR}/>
    }

    if(this.state.logoutCompleted){
      return <SuccessView type={SUCCESS_CODES.LOGOUT}/>
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={style}>
          <Router submissionError={this.handleSubmissionError} 
          submissionCompleted={this.handleSubmissionCompleted}
          logoutCompleted={this.logoutCompleted}
          logoutError={this.logoutError}/>
        </Container>
      </StyleProvider>
    );
  }
}
