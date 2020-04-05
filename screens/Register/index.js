import React from 'react';
import { Content, Text, View, Form, Item, Input, Button } from 'native-base';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import colors from '../../native-base-theme/variables/material'
import Messages from '../../utils/messages';
import SelectLanguage from '../components/SelectLanguage';
import Acceptance from '../components/Acceptance';

const styles = {
    container:{flex:1, justifyContent:'center', alignItems:'center'},
    viewContainer: {
        width: '80%',
        borderWidth:2,
        padding: 10,
        borderRadius: 20,
        borderColor: colors.brandPrimary
    },
    QInput:{
        borderBottomWidth:1,
        marginBottom:30
    },
    QInputError:{
        borderBottomWidth:1,
        marginBottom:30,
        borderColor: colors.brandPrimary
    },
    submitButton:{
        borderRadius:10,
        justifyContent: 'center'
    }
}

export default class Register extends React.Component {

    constructor(props){
        super(props);

        this.state={
            qNumber: "",
            language: props.language,
            acceptance: props.acceptance
        }

        this.onHandleRegister= this.onHandleRegister.bind(this);
        this.onHandleChangeLanguage= this.onHandleChangeLanguage.bind(this);
        this.onHandleAccepted = this.onHandleAccepted.bind(this);
    }

    onHandleRegister(){
        this.props.registerPatient(this.state.qNumber,this.state.language,this.state.acceptance);
    }

    onHandleChangeLanguage(language){
        this.setState({language})
    }

    onHandleAccepted(){
        this.setState({acceptance:true})
    }

    render(){

        if(!this.state.language){
            return <SelectLanguage language={this.state.language} changeLanguage={this.onHandleChangeLanguage}/>
        }

        if(!this.state.acceptance){
            return <Acceptance onAccepted={this.onHandleAccepted} language={this.state.language}/>
        }

        return(
            <Content contentContainerStyle={styles.container}>
                <View style={styles.viewContainer}>
                    <Form>
                        <Item>
                            <Input 
                                style={this.props.isRegistrationError ? styles.QInputError : styles.QInput} 
                                placeholder={ this.props.isRegistrationError ? Messages('wrongNumber', this.state.language):  Messages('enterQNumber', this.state.language)}
                                value={this.state.qNumber}
                                onChangeText={(qNumber)=>this.setState({qNumber})}
                            />
                        </Item>
                        <Button disabled={this.state.qNumber === ""} style={styles.submitButton} onPress={this.onHandleRegister}>
                            <Text>{Messages('register', this.state.language)}</Text> 
                        </Button>    
                    </Form>
                </View>
            </Content>
        )
    }
}