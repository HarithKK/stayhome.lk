import React from 'react';
import { TouchableOpacity, BackHandler } from "react-native";
import { Content, Text, View, Radio, Button } from 'native-base';
import constants from '../../../constants';
import Messages from '../../../utils/messages';

const styles = {
    container: {flex:1, justifyContent:'center', alignItems:'center'},
    viewStyle: {flexDirection:'row', flexWrap:'wrap', marginBottom: 10},
    radio:{marginRight: 10, marginTop:6},
    text: {fontSize: 25, textAlign: 'center'},
    button: {margin: 5, width: '40%', justifyContent: 'center'}
}

export default class SelectLanguage extends React.Component{

    constructor(props){
        super(props);

        this.state={
            language: props.language
        }

        this.onHandleOkButton= this.onHandleOkButton.bind(this);
        this.onHandleCancelButton= this.onHandleCancelButton.bind(this);
    }

    onHandleCancelButton(){
        BackHandler.exitApp()
    }

    onHandleOkButton(){
        this.props.changeLanguage(this.state.language);
    }

    render(){
        return(
            <Content contentContainerStyle={styles.container}>
                <View>
                    {constants.languages.map(language=>(
                        <TouchableOpacity key={language} onPress={()=>this.setState({language})}>
                            <View style={styles.viewStyle} >
                                <Radio
                                    style={styles.radio}
                                    color={"#f0ad4e"}
                                    selectedColor={"#5cb85c"}
                                    selected={this.state.language === language}
                                    onPress={()=>this.setState({language})}
                                />
                                <Text style={styles.text}>{constants.languagesTexts[language].fullText}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {
                    this.state.language !== null && 
                    <View  style={styles.viewStyle}>
                        <Button style={styles.button} onPress={this.onHandleOkButton}><Text >{Messages('ok',this.state.language)}</Text></Button>
                        <Button style={styles.button} dark onPress={this.onHandleCancelButton}><Text>{Messages('quit',this.state.language)}</Text></Button>
                    </View>
                }
            </Content>
        )
    }
}