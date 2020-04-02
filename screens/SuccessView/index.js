import React from 'react';
import { Content, Icon, Text } from 'native-base';
import colors from '../../native-base-theme/variables/commonColor.js'
import Messages from '../../utils/messages';

export const SUCCESS_CODES = {
    SUBMITTED: 'SUBMITTED',
    LOGOUT:'LOGOUT'
}

const styles = {
    container:{flex:1, justifyContent:'center', alignItems:'center'},
    icon: {fontSize: 80, color: colors.brandSuccess},
    text: {color: colors.brandSuccess}
}

export default ({type, language}) => {

    let data = {
        iconName: 'exclamation',
        message: ''
    };

    switch(type){
        case SUCCESS_CODES.SUBMITTED:
            data = {
                iconName: 'check-box-outline',
                message: Messages('submitted', language)
            };
            break;
        case SUCCESS_CODES.LOGOUT:
            data = {
                iconName: 'cloud-check',
                message: Messages('logoutSuccess', language)
            };
            break;
        default:
            data = {
                iconName: 'exclamation',
                message: '',
            };
            break;
    }
    

    return <Content contentContainerStyle={styles.container}>
                <Icon danger name={data.iconName} type="MaterialCommunityIcons" style={styles.icon} />
                <Text style={styles.text}>{data.message}</Text>
            </Content>
}