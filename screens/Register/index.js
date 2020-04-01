import React from 'react';
import { Content, Text, View, Form, Item, Input, Button } from 'native-base';
import colors from '../../native-base-theme/variables/material'

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
            qNumber: ""
        }

        this.onHandleRegister= this.onHandleRegister.bind(this);
    }

    onHandleRegister(){
        this.props.registerPatient(this.state.qNumber);
    }

    render(){

        return(
            <Content contentContainerStyle={styles.container}>
                <View style={styles.viewContainer}>
                    <Form>
                        <Item>
                            <Input 
                                style={this.props.isRegistrationError ? styles.QInputError : styles.QInput} 
                                placeholder="Enter Quarantine Number" 
                                value={this.state.qNumber}
                                onChangeText={(qNumber)=>this.setState({qNumber})}
                            />
                        </Item>
                        <Button disabled={this.state.qNumber === ""} style={styles.submitButton} onPress={this.onHandleRegister}>
                            <Text>Register</Text> 
                        </Button>    
                    </Form>
                </View>
            </Content>
        )
    }
}