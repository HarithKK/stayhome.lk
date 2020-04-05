import React from 'react';
import { Content, Icon, Text } from 'native-base';
import colors from '../../native-base-theme/variables/commonColor.js'
import Messages from '../../utils/messages';

export const ERROR_CODES = {
    NO_NETWORK: 'NO_NETWORK',
    NO_INTERNET: 'NO_INTERNET',
    SUBMIT_ERROR: 'SUBMIT_ERROR',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
    LOCATION_ERROR: 'LOCATION_ERROR'
}

const styles = {
    container:{flex:1, justifyContent:'center', alignItems:'center'},
    icon: {fontSize: 80, color: colors.brandDanger},
    text: {color: colors.brandDanger}
}

export default ({type,language}) => {

    let data = {
        iconName: 'exclamation',
        message: 'Unknown Error'
    };

    switch(type){
        case ERROR_CODES.NO_NETWORK:
            data = {
                iconName: 'network-off',
                message: Messages('noConnection', language)
            };
            break;
        case ERROR_CODES.NO_INTERNET:
            data = {
                iconName: 'access-point-network-off',
                message: Messages('noInternet', language)
            };
            break;
        case ERROR_CODES.SUBMIT_ERROR:
            data = {
                iconName: 'cloud-question',
                message: Messages('reportSendError', language)
                
            };
            break;
        case ERROR_CODES.LOGOUT_ERROR:
            data = {
                iconName: 'cloud-alert',
                message: Messages('logoutError', language)
            };
            break;
        case ERROR_CODES.LOCATION_ERROR:
            data = {
                iconName: 'location-off',
                iconType: 'MaterialIcons',
                message: Messages('locationError', language)
            };
            break;
        default:
            data = {
                iconName: 'exclamation',
                message: Messages('unknownError', language)
            };
            break;
    }
    

    return <Content contentContainerStyle={styles.container}>
                <Icon danger name={data.iconName} type={data.iconType || 'MaterialCommunityIcons'} style={styles.icon} />
                <Text style={styles.text}>{data.message}</Text>
            </Content>
}