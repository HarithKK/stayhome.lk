import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import SymptomsSheet from '../SymptomsSheet';
import Emergency from '../Emergency';

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
    if(this.state.activeTab===0){
        return <SymptomsSheet submitReport={this.props.submitReport} logout={this.props.logout}/>
    }else if(this.state.activeTab===1){
      return <Emergency logout={this.props.logout}/>
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
                <Text >පිරික්සුම් ලැයිස්තුව</Text>
                <Text >Check list</Text>
            </Button>
            <Button onPress={()=>this.setActiveTab(1)} active={this.state.activeTab===1}>
                <Icon name='phone-call' type="Feather" />
                <Text >හදිසි ඇමතුම්</Text>
                <Text >Emergency calls</Text>
            </Button>
           </FooterTab>
        </Footer>
      </Container>
    );
  }
}