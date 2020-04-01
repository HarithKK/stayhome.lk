import React from 'react';
import { Content, Spinner } from 'native-base';

const styles = {
    container:{flex:1, justifyContent:'center', alignItems:'center'},
}

export default () => <Content contentContainerStyle={styles.container}>
                        <Spinner />
                    </Content>