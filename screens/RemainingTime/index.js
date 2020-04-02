import React from 'react';
import { Content, Icon, Text, Button,View } from 'native-base';
import { BackHandler } from 'react-native'
import Messages from '../../utils/messages';
import colors from '../../native-base-theme/variables/commonColor.js'

const styles = {
    container:{flex:1, justifyContent:'center', alignItems:'center'},
    daysText:{ fontSize:200},
    qText: {color: colors.brandSuccess, fontSize:30, textAlign:'center'},
    button: {
        margin:10,
        marginTop:30,
        width:'30%',
        borderRadius:40,
        justifyContent: 'center',
    }
}

export default ({days, language}) => {
    if(days===0){
        return (
            <Content contentContainerStyle={styles.container}>
                <Text style={styles.qText}>{Messages('successfullyQuarantinedMessage', language)}</Text>
                <Button bordered success style={styles.button} onPress={()=>BackHandler.exitApp()}>
                    <View>
                        <Text style={{textAlign:'center'}}>{Messages('quit', language)}</Text>
                    </View>
                </Button>
            </Content>
        )
    }

    let newStyle = {}
    if(days>10){
        newStyle={color: colors.brandDanger}
    }else if(days>5){
        newStyle={color: colors.brandWarning}
    }else if(days>0){
        newStyle={color: colors.brandSuccess}
    }else{
        newStyle = {};
    }

    return (
        <Content contentContainerStyle={styles.container}>
                <Text style={{...styles.daysText,...newStyle}}>{days}</Text>
                <Text >{Messages('moreDays', language)}</Text>
        </Content>
    )
}