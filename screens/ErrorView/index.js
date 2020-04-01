import React from 'react';
import { Content, Icon, Text } from 'native-base';
import colors from '../../native-base-theme/variables/commonColor.js'

export const ERROR_CODES = {
    NO_NETWORK: 'NO_NETWORK',
    NO_INTERNET: 'NO_INTERNET',
    SUBMIT_ERROR: 'SUBMIT_ERROR',
    LOGOUT_ERROR: 'LOGOUT_ERROR'
}

const styles = {
    container:{flex:1, justifyContent:'center', alignItems:'center'},
    icon: {fontSize: 80, color: colors.brandDanger},
    text: {color: colors.brandDanger}
}

export default ({type}) => {

    let data = {
        iconName: 'exclamation',
        message: 'Unknown Error'
    };

    switch(type){
        case ERROR_CODES.NO_NETWORK:
            data = {
                iconName: 'network-off',
                message: 'No Connection',
                sinhalaMessage: 'සම්බන්ධතා දෝෂයකි'
            };
            break;
        case ERROR_CODES.NO_INTERNET:
            data = {
                iconName: 'access-point-network-off',
                message: 'No Internet',
                sinhalaMessage: 'අන්තර්ජාල දෝෂයකි'
            };
            break;
        case ERROR_CODES.SUBMIT_ERROR:
            data = {
                iconName: 'cloud-question',
                message: 'Report Submission Error',
                sinhalaMessage: 'වාර්තා යැවීමේ දෝෂයකි'
            };
            break;
        case ERROR_CODES.LOGOUT_ERROR:
            data = {
                iconName: 'cloud-alert',
                message: 'Logout Error',
                sinhalaMessage: 'පිටවීමේ දෝෂයකි'
            };
            break;
        default:
            data = {
                iconName: 'exclamation',
                message: 'Unknown Error',
                sinhalaMessage: 'නොදන්නා දෝෂයකි'
            };
            break;
    }
    

    return <Content contentContainerStyle={styles.container}>
                <Icon danger name={data.iconName} type="MaterialCommunityIcons" style={styles.icon} />
                <Text style={styles.text}>{data.message}</Text>
                <Text style={styles.text}>{data.sinhalaMessage}</Text>
            </Content>
}