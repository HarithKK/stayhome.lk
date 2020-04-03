import React, { Component } from 'react';
import { Container, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import SymptomsSheet from '../SymptomsSheet';
import RemainingTime from '../RemainingTime';
import Emergency from '../Emergency';
import WelfareRequirements from '../WelfareRequirements';
import Messages from '../../utils/messages';

export default class Tabs extends Component {

  constructor(props){
      super(props);

      this.state={
          activeTab: 0
      }

      this.setActiveTab = this.setActiveTab.bind(this);
      this.generateContent = this.generateContent.bind(this);
  }

  setActiveTab(activeTab){
    this.setState({activeTab})
  }

  generateContent(){
    if(this.state.activeTab===0){this.props.remainingDays
        if(this.props.remainingDays===0){
          return <RemainingTime days={0} language={this.props.language}/>
        }
        return <SymptomsSheet 
        remainingDays={this.props.remainingDays}
        submitReport={this.props.submitReport}
        logout={this.props.logout}
        showRemaining={this.props.showRemaining}
        language={this.props.language}
        changeLanguage={this.props.changeLanguage}/>
    }else if(this.state.activeTab===1){
      return <Emergency
       remainingDays={this.props.remainingDays}
       logout={this.props.logout}
       inspectUsers={this.props.inspectUsers}
       showRemaining={this.props.showRemaining}
       language={this.props.language}
       changeLanguage={this.props.changeLanguage}/>
    }else if(this.state.activeTab===2){
      return <WelfareRequirements
       remainingDays={this.props.remainingDays}
       logout={this.props.logout}
       sendWelfareRequest={this.props.sendWelfareRequest}
       showRemaining={this.props.showRemaining}
       language={this.props.language}
       changeLanguage={this.props.changeLanguage}/>
    }else{
        return <NoContent/>
    }
  }

  render() {
    return (
      <Container>
        {this.generateContent()}
        <Footer style={{height:60}}>
          <FooterTab>
            <Button onPress={()=>this.setActiveTab(0)} active={this.state.activeTab===0}>
                <Icon name='checklist' type="Octicons" />
                <Text >{Messages('checkList', this.props.language)}</Text>
            </Button>
            <Button onPress={()=>this.setActiveTab(1)} active={this.state.activeTab===1}>
                <Icon name='phone-call' type="Feather" />
                <Text >{Messages('emergencyCalls',this.props.language)}</Text>
            </Button>
            <Button onPress={()=>this.setActiveTab(2)} active={this.state.activeTab===2}>
                <Icon name='users' type="Feather" />
                <Text >{Messages('welfareRequests',this.props.language)}</Text>
            </Button>
           </FooterTab>
        </Footer>
      </Container>
    );
  }
}