import React from 'react';
import { Linking } from 'expo';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { Content, Text,Card,CardItem, Right, View, Body, Button, Icon, Left } from 'native-base';
import colors from '../../native-base-theme/variables/material';
import Header from '../components/Header';
import contacts from './contacts';
import Messages from '../../utils/messages';

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
    },
    ownColor:{
        color: colors.brandBlue
    },
    rightComponent: {display:'flex', alignItems:'flex-end'},
    callMoreButton:{width:200,marginTop:10, borderRadius: 10},
    callMoreText:{textAlign:'center', color: colors.brandWhite},
    callMoreView: { flex:1, justifyContent:"center"}
}

export default class SymptomsSheet extends React.Component{

    constructor(props){
        super(props);

        this.state={
            visible: false
        }

    }

    onHandleClick(number){
        this.setState({visible:false})
        Linking.openURL(`tel:${number}`);
    }

    render(){

        return(
        <>    
        <Header
         remainingDays={this.props.remainingDays}
         title={Messages('emergencyCalls', this.props.language)} 
         logout={this.props.logout}
         showRemaining={this.props.showRemaining}
         changeLanguage={this.props.changeLanguage}
         language={this.props.language}
         />    
        <Content style={styles.container}>
               <Card style={styles.card}>
                    <CardItem > 
                        <Left>
                        <View>
                            <Text style={{...styles.text,...styles.ownColor}}>{Messages('callYourPolice', this.props.language)}</Text>
                            {this.props.inspectUsers.map((inspectUser,key)=><Text key={key} style={{...styles.mobileText,...styles.ownColor}}>{`${inspectUser.name}-${inspectUser.mobile}`}</Text>)}
                            
                        </View>
                        </Left>
                        <Right style={styles.rightComponent}>
                            <Button success rounded onPress={()=>this.setState({ visible: true })}>
                                <Icon name="ios-call" type="Ionicons" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

            {
                contacts.map((contact,key)=>
                <Card style={styles.card} transparent key={key}>
                    <CardItem > 
                        <Left>
                        <View>
                            <Text style={styles.text}>{Messages(contact.telephone, this.props.language)}</Text>
                            <Text style={styles.mobileText}>{contact.telephone}</Text>
                        </View>
                        </Left>
                        <Right style={styles.rightComponent}>
                            <Button rounded onPress={()=>this.onHandleClick(contact.telephone)}>
                                <Icon name="ios-call" type="Ionicons" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>)
            }
            <Dialog
                visible={this.state.visible}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="Cancel"
                        onPress={()=>this.setState({ visible: false })}
                      />
                    </DialogFooter>
                  }
            >
                <DialogContent>
                    {
                        this.props.inspectUsers.map((inspectUser,key)=>(
                            <Button success style={styles.callMoreButton} key={key} onPress={()=>this.onHandleClick(inspectUser.mobile)}>
                                <View style={styles.callMoreView}>
                                    <Text style={styles.callMoreText}>{inspectUser.name}</Text>
                                    <Text style={styles.callMoreText}>{inspectUser.mobile}</Text>
                                </View>
                            </Button>
                        ))
                    }
                </DialogContent>
            </Dialog>
        </Content>
        </>
     )
    }
}

