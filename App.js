import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Container, StyleProvider } from 'native-base';
import * as Font from 'expo-font';
import * as Network from 'expo-network';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { _retrieveData, _storeData } from './utils/asyncStore';
import constants from './constants';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import ErrorView, { ERROR_CODES } from './screens/ErrorView';
import SuccessView, { SUCCESS_CODES } from './screens/SuccessView';
import Router from './screens/Router'
import {unregisterLocationUpdateTask} from './utils/taskManager';

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
        logoutError:false,
      },
      language: 'en' 
    };

    let timer = null;

    this.handleSubmissionError= this.handleSubmissionError.bind(this);
    this.handleSubmissionCompleted= this.handleSubmissionCompleted.bind(this);
    this.logoutError= this.logoutError.bind(this);
    this.logoutCompleted=this.logoutCompleted.bind(this);
    this.changeLanguage=this.changeLanguage.bind(this);
    this.checkLocationServiceContinuously = this.checkLocationServiceContinuously.bind(this);
    this.changeLanguageById = this.changeLanguageById.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
      ...MaterialIcons.font
    });
    const {isConnected, isInternetReachable} = await Network.getNetworkStateAsync();
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const isLocationEnabled = await Location.hasServicesEnabledAsync();
    Location.startLocationUpdatesAsync(constants.tasks.LOCATION_UPDATE, {
      timeInterval: 2000,
      accuracy: Location.Accuracy.High
    })
    this.checkLocationServiceContinuously();

    let language = await _retrieveData(constants.storeKeys.Language) || 'en';
    this.setState({ 
        isReady: true,
        networkState: {
            isConnected,
            isInternetReachable
        },
        language,
        locationStatus: status,
        isLocationEnabled
      });
  }

  checkLocationServiceContinuously(){
    this.timer = setTimeout(async ()=>{ 
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      if(this.state.isLocationEnabled !== isLocationEnabled){
        this.setState({isLocationEnabled})
      }
      clearTimeout(this.timer);
      this.checkLocationServiceContinuously();
    }, 5000)
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

  async changeLanguage(){
    const l = constants.languages.indexOf(this.state.language) + 1;
    const language = constants.languages[l===constants.languages.length ? 0 : l]
    await _storeData(constants.storeKeys.Language,language);
    this.setState({language});
  }

  async changeLanguageById(language){
    this.setState({language});
  }

  render() {
    if (!this.state.isReady) {
      return null;
    }

    if(!this.state.networkState.isConnected){
      return <ErrorView type={ERROR_CODES.NO_NETWORK} language={this.state.language}/>
    }

    if(!this.state.networkState.isInternetReachable){
      return <ErrorView type={ERROR_CODES.NO_INTERNET} language={this.state.language}/>
    }

    if(this.state.locationStatus !== 'granted' || !this.state.isLocationEnabled){
      return <ErrorView type={ERROR_CODES.LOCATION_ERROR} language={this.state.language}/>
    }

    if(this.state.submissionError){
      return <ErrorView type={ERROR_CODES.SUBMIT_ERROR} language={this.state.language}/>
    }

    if(this.state.submissionCompleted){
      return <SuccessView type={SUCCESS_CODES.SUBMITTED} language={this.state.language}/>
    }

    if(this.state.logoutError){
      return <ErrorView type={ERROR_CODES.LOGOUT_ERROR} language={this.state.language}/>
    }

    if(this.state.logoutCompleted){
      return <SuccessView type={SUCCESS_CODES.LOGOUT} language={this.state.language}/>
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={style}>
          <Router submissionError={this.handleSubmissionError} 
          submissionCompleted={this.handleSubmissionCompleted}
          logoutCompleted={this.logoutCompleted}
          logoutError={this.logoutError}
          language={this.state.language}
          changeLanguage={this.changeLanguage}
          changeLanguageById={this.changeLanguageById}/>
        </Container>
      </StyleProvider>
    );
  }
}
