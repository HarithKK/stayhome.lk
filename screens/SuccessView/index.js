import React from 'react';
import { Content, Icon, Text } from 'native-base';
import colors from '../../native-base-theme/variables/commonColor.js'

export const SUCCESS_CODES = {
    SUBMITTED: 'SUBMITTED',
    LOGOUT:'LOGOUT'
}

const styles = {
    container:{flex:1, justifyContent:'center', alignItems:'center'},
    icon: {fontSize: 80, color: colors.brandSuccess},
    text: {color: colors.brandSuccess}
}

export default ({type}) => {

    let data = {
        iconName: 'exclamation',
        message: 'Unknown Message'
    };

    switch(type){
        case SUCCESS_CODES.SUBMITTED:
            data = {
                iconName: 'check-box-outline',
                message: 'Report Sent',
                sinhalaMessage: 'වාර්තාව යවා ඇත'
            };
            break;
        case SUCCESS_CODES.LOGOUT:
            data = {
                iconName: 'cloud-check',
                message: 'Logout Completed',
                sinhalaMessage: 'පිටවීමේ සම්පුර්ණ කරන ලදි'
            };
            break;
        default:
            data = {
                iconName: 'exclamation',
                message: '',
                sinhalaMessage: ''
            };
            break;
    }
    

    return <Content contentContainerStyle={styles.container}>
                <Icon danger name={data.iconName} type="MaterialCommunityIcons" style={styles.icon} />
                <Text style={styles.text}>{data.message}</Text>
                <Text style={styles.text}>{data.sinhalaMessage}</Text>
            </Content>
}