import React from 'react';
import { Content, Text,Card,CardItem, Right, View, Left, Button } from 'native-base';
import { Image, Switch, TouchableNativeFeedback } from 'react-native';
import colors from '../../native-base-theme/variables/material';
import Header from '../components/Header';
import symptoms from './symptoms';

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
    }
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
        <Header title="Check list" subtitle="පිරික්සුම් ලැයිස්තුව" logout={this.props.logout}/>    
        <Content style={styles.container}>
            {
                symptoms.map((symptom,key)=>
                <Card style={styles.card} transparent key={key}>
                    <TouchableNativeFeedback onPress={()=>this.onHandleClick(symptom.type)}>
                    <CardItem > 
                        <Left>
                        <Image active style={styles.cardImage} source={{uri: symptom.image}}/>
                        <View>
                            <Text style={styles.text}>{symptom.sinhalaText}</Text>
                            <Text style={styles.text}>{symptom.englishText}</Text>
                        </View>
                        </Left>
                        <Right >
                            <View>
                            <Switch
                                 onValueChange={()=>this.onHandleClick(symptom.type)}   
                                 trackColor={{ false: colors.brandSuccessMuted, true: colors.brandDangerMuted }}
                                 thumbColor={ this.state[symptom.type] ? colors.brandDanger : colors.brandSuccess}
                                 value={this.state[symptom.type]}
                            />
                            <Text style={styles.switchText}>{this.state[symptom.type] ? 'Yes/ඔව්' : 'No/නැත'}</Text>
                            </View>
                        </Right>
                    </CardItem>
                    </TouchableNativeFeedback>
                </Card>)
            }
            <Button style={styles.submitButton} onPress={this.onHandleSubmit}>
                <View>
                    <Text style={styles.submitText}>වාර්තාව යවන්න</Text>
                    <Text style={styles.submitText}>Submit Report</Text>
                </View>
            </Button>
        </Content>
        </>
     )
    }
}

