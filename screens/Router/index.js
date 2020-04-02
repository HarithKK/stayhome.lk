import React from 'react';
import { _retrieveData, _storeData, _removeData } from '../../utils/asyncStore';
import constants from '../../constants';
import Loader from '../Loader';
import Register from '../Register';
import Tabs from '../Tabs';
import RemainingTime from '../RemainingTime';
import { register, submitReport, unregister, authenticate } from '../../utils/api';

export default class Router extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isLoading: true,
            qNumber: null,
            isRegistrationError: false,
            policeOfficerName: "",
            policeOfficerMobile: "",
            remainingNumberOfDays: 0,
            showRemaining: false
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
        const qNumber = await _retrieveData(constants.storeKeys.RegisterToken);
        if(!qNumber){
            this.setState({isLoading: false, qNumber: null})
            return;
        }else{
            const response = await authenticate(qNumber);
            if(response){
                const {
                    isAuthenticated,
                    policeOfficerName,
                    policeOfficerMobile,
                    remainingDays
                } = response;
                if(isAuthenticated){
                    this.setState({
                        isLoading: false, 
                        qNumber,
                        policeOfficerName,
                        policeOfficerMobile,
                        remainingDays
                    })
                }else{
                    this.setState({isLoading: false, qNumber: null})
                }
            }else{
                this.setState({isLoading: false, qNumber: null})
            }
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
                policeOfficerName,
                policeOfficerMobile,
                remainingDays
            } = response;
            if(isAuthenticated){
                this.setState({
                    isLoading: false, 
                    qNumber,
                    policeOfficerName,
                    policeOfficerMobile,
                    remainingDays,
                    isRegistrationError:false
                })
                await _storeData(constants.storeKeys.RegisterToken,qNumber);
            }else{
                this.setState({isRegistrationError:true})
            }
        }else{
            this.setState({isRegistrationError:true})
        }
    }

    async submitReport(list){
        this.setLoadingTrue();
        const response = await submitWelfareReport({qNumber:this.state.qNumber,list});
        this.setLoadingFalse();
        if(response){
            this.props.submissionCompleted();
        }else{
            this.props.submissionError();
        }
    }

    async sendWelfareRequest(data){
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
         policeOfficerName={this.state.policeOfficerName}
         policeOfficerMobile={this.state.policeOfficerMobile}
         remainingDays={this.state.remainingDays}
         showRemaining={this.showRemaining}
         language={this.props.language}
         changeLanguage={this.props.changeLanguage}
         sendWelfareRequest={this.sendWelfareRequest}/>
    }
}