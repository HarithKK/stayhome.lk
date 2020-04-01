import React from 'react';
import { Linking } from 'expo';
import { Content, Text,Card,CardItem, Right, View, Left, Button, Icon } from 'native-base';
import colors from '../../native-base-theme/variables/material';
import Header from '../components/Header';
import contacts from './contacts';

const styles = {
    container:{marginBottom:20},
    card:{
        marginLeft:10,
        marginRight:10
    },
    cardImage:{
        width:60,
        height:60,
        marginLeft:-10
    },
    text:{
        fontSize:16
    },
    mobileText:{
        fontSize:11,
        textAlign:'center',
        color:'black'
    }
}

export default class SymptomsSheet extends React.Component{

    constructor(props){
        super(props);

        this.state={
        }

    }

    onHandleClick(number){
        Linking.openURL(`tel:${number}`);
    }

    render(){

        return(
        <>    
        <Header title="Emergency calls" subtitle="හදිසි ඇමතුම්" logout={this.props.logout}/>    
        <Content style={styles.container}>
            {
                contacts.map((contact,key)=>
                <Card style={styles.card} transparent key={key}>
                    <CardItem > 
                        <Left>
                        <View>
                            <Text style={styles.text}>{contact.englishName}</Text>
                            <Text style={styles.text}>{contact.sinhalaName}</Text>
                            <Text style={styles.mobileText}>{contact.telephone}</Text>
                        </View>
                        </Left>
                        <Right >
                            <Button rounded onPress={()=>this.onHandleClick(contact.telephone)}>
                                <Icon name="ios-call" type="Ionicons" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>)
            }
        </Content>
        </>
     )
    }
}

