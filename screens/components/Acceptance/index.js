import React from 'react';
import { BackHandler, ScrollView } from "react-native";
import { MarkdownView } from 'react-native-markdown-view'
import { Text, View, Button } from 'native-base';
import Messages from '../../../utils/messages';

const styles = {
    container:{flex:1, marginTop: '5%',paddingLeft:10,paddingRight:10},
    text: {textAlign:"justify"},
    viewStyle: {marginTop: 30,flexDirection:'row', flexWrap:'wrap', marginBottom: 10},
    button: {margin: 5, width: '45%', justifyContent: 'center'}
}

const onHandleCancelButton = () => {
    BackHandler.exitApp()
}

export default ({language, onAccepted}) => 
    <ScrollView 
        behaviour = "height" 
        style= {styles.container}>
        
        <MarkdownView style={styles.text} >{Messages('acceptance',language)}</MarkdownView>
        <View  style={styles.viewStyle}>
            <Button style={styles.button} onPress={onAccepted}><Text >{Messages('accept',language)}</Text></Button>
            <Button style={styles.button} dark onPress={onHandleCancelButton}><Text>{Messages('quit',language)}</Text></Button>
        </View>
    </ScrollView> 