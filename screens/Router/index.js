import React from 'react';
import { _retrieveData, _storeData, _removeData } from '../../utils/asyncStore';
import constants from '../../constants';
import Loader from '../Loader';
import Register from '../Register';
import Tabs from '../Tabs';
import { register, submitReport, unregister } from '../../utils/api';

export default class Router extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isLoading: true,
            qNumber: null,
            isRegistrationError: false,
        }

        this.setLoadingTrue = this.setLoadingTrue.bind(this);
        this.setLoadingFalse = this.setLoadingFalse.bind(this);
        this.registerPatient = this.registerPatient.bind(this);
        this.submitReport= this.submitReport.bind(this);
        this.logout=this.logout.bind(this);
    }

    async componentDidMount(){
        const qNumber = await _retrieveData(constants.storeKeys.RegisterToken);
        if(!qNumber){
            this.setState({isLoading: false, qNumber: null})
            return;
        }
        this.setState({isLoading: false, qNumber})
    }

    setLoadingFalse(){
        this.setState({isLoading: false})
    }

    setLoadingTrue(){
        this.setState({isLoading: true})
    }

    async registerPatient(qNumber){
        this.setLoadingTrue();
        const response = await register(qNumber);
        this.setLoadingFalse();
        if(response){
            this.setState({qNumber});
            this.setState({isRegistrationError:false})
            await _storeData(constants.storeKeys.RegisterToken,qNumber);
        }else{
            this.setState({isRegistrationError:true})
        }
    }

    async submitReport(data){
        this.setLoadingTrue();
        const response = await submitReport({...data,qNumber:this.state.qNumber});
        this.setLoadingFalse();
        if(response){
            this.props.submissionCompleted();
        }else{
            this.props.submissionError();
        }
    }

    async logout(){
        this.setLoadingTrue();
        const response = await unregister(this.state.qNumber);
        this.setLoadingFalse();
        if(response){
            this.setState({qNumber: null});
            await _removeData(constants.storeKeys.RegisterToken);
            this.props.logoutCompleted();
        }else{
            this.props.logoutError();
        }
    }

    render(){
        if(this.state.isLoading){
            return <Loader/>
        }

        if(!this.state.qNumber){
            return <Register
                registerPatient={(qNumber)=>this.registerPatient(qNumber)}
                isRegistrationError={this.state.isRegistrationError}
            />
        }
        return <Tabs submitReport={this.submitReport} logout={this.logout}/>
    }
}