import React from 'react';
import { Linking } from 'expo';
import { Content, Text,Card,CardItem, Right, View, Body, Button, Icon, Left, List, ListItem, Input, Row, Col } from 'native-base';
import colors from '../../native-base-theme/variables/material';
import Header from '../components/Header';
import Messages from '../../utils/messages';

const styles = {
    container:{marginBottom:60},
    addNewButtonIcon: {marginRight: -10},
    addNewText: {borderBottomWidth:1},
    addNewButton: {margin: 5, borderRadius: 10},
    sendRequestButton: {margin: 10,borderRadius:10,position:'absolute',bottom:0,right:0,left:0, marginBottom:70}
}

export default class WelfareRequirements extends React.Component{

    constructor(props){
        super(props);

        this.state={
            listData: [
                "Rice",
                "Vegetable",
                "Fish/Meat",
                "Groceries",
                "Medicine"
            ],
            showInput: false,
            text:''
        }
        this.handleRemoveButton= this.handleRemoveButton.bind(this);
        this.OnHandleListInputShow= this.OnHandleListInputShow.bind(this);
        this.OnHandleListInputHide= this.OnHandleListInputHide.bind(this);
        this.onHandlePressAddNew= this.onHandlePressAddNew.bind(this);
    }

    handleRemoveButton(key){
        const listData = this.state.listData; 
        listData.splice(key,1);
        this.setState({listData});
    }

    OnHandleListInputShow(){
        this.setState({showInput:true});
    }

    OnHandleListInputHide(){
        this.setState({showInput:false});
    }

    onHandlePressAddNew(e){
        if(this.state.text===""){
            return;
        }
        const listData = this.state.listData; 
        listData.push(this.state.text);
        this.setState({listData});
    }

    render(){

        return(
        <>    
        <Header
         remainingDays={this.props.remainingDays}
         title={Messages('welfareRequests', this.props.language)} 
         logout={this.props.logout}
         showRemaining={this.props.showRemaining}
         changeLanguage={this.props.changeLanguage}
         language={this.props.language}
         />    
        <Content style={styles.container}>
            <List>
                {
                    this.state.listData.map((listItem,key)=>
                    <ListItem key={key}>
                        <Left>
                            <Text>{listItem}</Text>
                        </Left>
                        <Right>
                            <Button rounded bordered onPress={()=>this.handleRemoveButton(key)}>
                                <Icon name="delete" type="MaterialCommunityIcons"/>
                            </Button>
                        </Right>
                    </ListItem>)
                }
                {
                    !this.state.showInput ?
                    (<ListItem >
                        <Body>
                            <Button onPress={this.OnHandleListInputShow} success full bordered>
                                <Icon style={styles.addNewButtonIcon} name="clipboard-plus" type="MaterialCommunityIcons"/>
                                <Text>{Messages('addNew', this.props.language)}</Text>
                            </Button>
                        </Body>
                    </ListItem>) :
                    (
                    <ListItem >
                        <Left>
                            <Input 
                                onChangeText={(text)=>this.setState({text})}
                                placeholder = {Messages('item', this.props.language)}
                                style={styles.addNewText}
                            />
                        </Left>
                        <Button onPress={this.onHandlePressAddNew} style={styles.addNewButton} full success>
                            <Icon name="check" type="MaterialCommunityIcons"/>
                        </Button>
                        <Button onPress={this.OnHandleListInputHide} style={styles.addNewButton} full>
                            <Icon name="close" type="MaterialCommunityIcons"/>
                        </Button>
                    </ListItem>
                    )
                }
            </List>
        </Content>
        <Button disabled={this.state.listData.length===0} full style={styles.sendRequestButton} onPress={()=>this.props.sendWelfareRequest(this.state.listData)}>
            <Text>
                {Messages('sendRequest', this.props.language)}
            </Text>
        </Button>
        </>
     )
    }
}

