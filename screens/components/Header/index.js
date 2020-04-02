import React from 'react';
import { View,Text,Left,Right,Body,Title, Header, Icon, Button } from 'native-base';
import constants from '../../../constants';


export default ({title, subtitle, logout, showRemaining,remainingDays, changeLanguage, language}) => 
        <Header style={{height:70}}>
          
          <Left>
            {
            remainingDays!==0 && <Button transparent onPress={showRemaining}>
                <Icon name='timer' type="MaterialCommunityIcons" />
            </Button>
            }
          </Left>  
          <Title style={{textAlign:'center', marginTop:23}}>{title}</Title>
          <Right >
            <Button style={{marginTop: 10}} transparent onPress={changeLanguage}>
              <Text>{constants.languagesTexts[language].text}</Text>
            </Button>
            <Button transparent onPress={logout}>
                <Icon name='logout' type="MaterialCommunityIcons" />
            </Button>
          </Right>
        </Header>