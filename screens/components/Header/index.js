import React from 'react';
import { View,Text,Left,Right,Body,Title, Header, Subtitle, Icon, Button } from 'native-base';


export default ({title, subtitle, logout}) => 
        <Header style={{height:70}}>
          
          <Left/>
          <Body style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Title style={{textAlign:'center'}}>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={logout}>
                <Icon name='logout' type="MaterialCommunityIcons" />
            </Button>
          </Right>
        </Header>