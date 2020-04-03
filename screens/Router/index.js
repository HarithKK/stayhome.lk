import React from 'react';
import jwt_decode from 'jwt-decode';
import { _retrieveData, _storeData, _removeData } from '../../utils/asyncStore';
import constants from '../../constants';
import Loader from '../Loader';
import Register from '../Register';
import Tabs from '../Tabs';
import RemainingTime from '../RemainingTime';
import { register, submitReport, unregister, submitWelfareReport } from '../../utils/api';

export default class Router extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isLoading: true,
            qNumber: null,
            isRegistrationError: false,
            inspectUsers: [],
            remainingNumberOfDays: 0,
            showRemaining: false,
            token:""
        }

        this.setLoadingTrue = this.setLoadingTrue.bind(this);
        this.setLoadingFalse = this.setLoadingFalse.bind(this);
        this.registerPatient = this.registerPatient.bind(this);
        this.submitReport= this.submitReport.bind(this);
        this.logout=this.logout.bind(this);
        this.showRemaining=this.showRemaining.bind(this);
        this.sendWelfareRequest= this.sendWelfareRequest.bind(this);
    }

    async componentDidMount(){
        const qNumber = await _retrieveData(constants.storeKeys.QNumber);
        const token = await _retrieveData(constants.storeKeys.RegisterToken);
        const registeredDate = await _retrieveData(constants.storeKeys.registeredDate);

        if(!qNumber || !token || !registeredDate){
            this.setState({isLoading: false, qNumber: null})
            return;
        }else{
            const today = new Date().getTime();
            const remainingDays = Math.round((today - Number(registeredDate))/(60*60*24*1000));
            const { inspectUsers }= jwt_decode(token);

            this.setState({
                isLoading: false, 
                qNumber,
                inspectUsers,
                remainingDays: remainingDays>14 ? 0 : (14-remainingDays),
                token
            })
        }
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
            const {
                isAuthenticated,
                token,
                inspectUsers,
                registeredDate
            } = response;
            if(isAuthenticated){
                this.setState({
                    isLoading: false, 
                    qNumber,
                    token,
                    inspectUsers,
                    remainingDays: 14,
                    isRegistrationError:false
                })
                await _storeData(constants.storeKeys.QNumber,qNumber);
                await _storeData(constants.storeKeys.RegisterToken,token);
                await _storeData(constants.storeKeys.registeredDate,`${registeredDate}`);
            }else{
                this.setState({isRegistrationError:true})
            }
        }else{
            this.setState({isRegistrationError:true})
        }
    }

    async submitReport(report){
        this.setLoadingTrue();
        const response = await submitReport(report, this.state.token);
        this.setLoadingFalse();
        if(response){
            this.props.submissionCompleted();
        }else{
            this.props.submissionError();
        }
    }

    async sendWelfareRequest(list){
        this.setLoadingTrue();
        const response = await submitWelfareReport(list,this.state.token);
        this.setLoadingFalse();
        if(response){
            this.props.submissionCompleted();
        }else{
            this.props.submissionError();
        }
    }

    async logout(){
        this.setLoadingTrue();
        const response = await unregister(this.state.token);
        this.setLoadingFalse();
        this.setState({qNumber: null});
        await _removeData(constants.storeKeys.qNumber);
        await _removeData(constants.storeKeys.RegisterToken);
        await _removeData(constants.storeKeys.registeredDate);
        this.props.logoutCompleted();
    }

    showRemaining(){
        this.setState({ showRemaining:true});
        setTimeout(()=>this.setState({showRemaining:false}), 2000);
    }

    render(){
        if(this.state.showRemaining){
            return <RemainingTime 
             days={this.state.remainingDays}
             language={this.props.language}/>
        }

        if(this.state.isLoading){
            return <Loader/>
        }

        if(!this.state.qNumber){
            return <Register
                registerPatient={(qNumber)=>this.registerPatient(qNumber)}
                isRegistrationError={this.state.isRegistrationError}
                language={this.props.language}
            />
        }
        return <Tabs 
         submitReport={this.submitReport}
         logout={this.logout}
         inspectUsers={this.state.inspectUsers}
         remainingDays={this.state.remainingDays}
         showRemaining={this.showRemaining}
         language={this.props.language}
         changeLanguage={this.props.changeLanguage}
         sendWelfareRequest={this.sendWelfareRequest}/>
    }
}