import React from 'react';
import { Content, Text,Card,CardItem, Right, View, Left, Button } from 'native-base';
import { Image, Switch, TouchableNativeFeedback } from 'react-native';
import colors from '../../native-base-theme/variables/material';
import Header from '../components/Header';
import symptoms from './symptoms';
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
        fontSize:13
    },
    switchText:{
        fontSize:11,
        textAlign:'center'
    },
    submitButton:{
        justifyContent: 'center',
        margin:10,
        borderRadius:10
    },
    submitText:{
        color: colors.brandWhite,
        textAlign:'center'
    },
    rightComponent: {display:'flex', alignItems:'flex-end'}
}

export default class SymptomsSheet extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isCough:false,
            isCold:false,
            isDiarrhea:false,
            isSoreThroat:false,
            isRash:false,
            isHeadache: false,
            isBreath: false,
            isFatigue: false
        }
        this.onHandleClick= this.onHandleClick.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onHandleClick(type){
        const ticked = this.state[type];
        this.setState({
            [type]: !ticked
        })
    }

    onHandleSubmit(){
        const {
            isCough,
            isCold,
            isDiarrhea,
            isSoreThroat,
            isRash,
            isHeadache,
            isBreath,
            isFatigue
        } = this.state;
        this.props.submitReport({
            isCough,
            isCold,
            isDiarrhea,
            isSoreThroat,
            isRash,
            isHeadache,
            isBreath,
            isFatigue
        });
    }

    render(){

        return(
        <>    
        <Header 
            remainingDays={this.props.remainingDays} 
             title={Messages('checkList', this.props.language)} 
             logout={this.props.logout} 
             showRemaining={this.props.showRemaining}
             changeLanguage={this.props.changeLanguage}
             language={this.props.language}/>    
        <Content style={styles.container}>
            {
                symptoms.map((symptom,key)=>
                <Card style={styles.card} transparent key={key}>
                    <TouchableNativeFeedback onPress={()=>this.onHandleClick(symptom.type)}>
                    <CardItem > 
                        <Left>
                        <Image active style={styles.cardImage} source={{uri: symptom.image}}/>
                        <View>
                            <Text style={styles.text}>{Messages(symptom.type, this.props.language)}</Text>
                        </View>
                        </Left>
                        <Right style={styles.rightComponent} >
                            <View>
                            <Switch
                                 onValueChange={()=>this.onHandleClick(symptom.type)}   
                                 trackColor={{ false: colors.brandSuccessMuted, true: colors.brandDangerMuted }}
                                 thumbColor={ this.state[symptom.type] ? colors.brandDanger : colors.brandSuccess}
                                 value={this.state[symptom.type]}
                            />
                            <Text style={styles.switchText}>{this.state[symptom.type] ? Messages('yes', this.props.language) : Messages('no', this.props.language)}</Text>
                            </View>
                        </Right>
                    </CardItem>
                    </TouchableNativeFeedback>
                </Card>)
            }
            <Button style={styles.submitButton} onPress={this.onHandleSubmit}>
                <View>
                    <Text style={styles.submitText}>{Messages('sendReportButtonText', this.props.language)}</Text>
                </View>
            </Button>
        </Content>
        </>
     )
    }
}

