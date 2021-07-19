import React, {Component} from 'react'

export default class ErrorAlert extends Component{
    render(){
        return(
        <div className="alert alert-success" role="alert">
            Error Occured.
        </div>
        )
    }
}