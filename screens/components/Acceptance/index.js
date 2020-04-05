import React from 'react';
import { BackHandler } from "react-native";
import { Content, Text, View, Button } from 'native-base';
import Messages from '../../../utils/messages';

const styles = {
    container:{flex:1, justifyContent:'flex-start', alignItems:'center',paddingTop:40, paddingLeft:10,paddingRight:10},
    text: {textAlign:"justify"},
    viewStyle: {marginTop: 30,flexDirection:'row', flexWrap:'wrap', marginBottom: 10},
    button: {margin: 5, width: '45%', justifyContent: 'center'}
}

const onHandleCancelButton = () => {
    BackHandler.exitApp()
}

export default ({language, onAccepted}) => 
    <Content contentContainerStyle={styles.container}>
        <Text style={styles.text} >{Messages('acceptance',language)}</Text>
        <View  style={styles.viewStyle}>
            <Button style={styles.button} onPress={onAccepted}><Text >{Messages('accept',language)}</Text></Button>
            <Button style={styles.button} dark onPress={onHandleCancelButton}><Text>{Messages('quit',language)}</Text></Button>
        </View>
    </Content>