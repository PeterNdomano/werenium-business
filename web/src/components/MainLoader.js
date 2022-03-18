import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import werenium_logo from '../logos/werenium_logo.png';

export default class MainLoader extends Component{

  render(){
    if(this.props.showLoader){
      return (
        <div className="MainLoader" id="mainLoader">

          <div className="mContainer text-center">
            <img src={werenium_logo} style={{ width: "100px", height: "100px"}}/>
            <TailSpin
              width={50}
              height={50}
              color = "var(--primaryColor)"
              wrapperStyle={{
                width: "40px",
                height:"40px",
                padding: "0px",
                background:"none",
                margin: "0 auto"
              }}
            />
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="MainLoader" id="mainLoader" style={{ display:"none" }}>

          <div className="mContainer text-center">
            <img src={werenium_logo} style={{ width: "100px", height: "100px"}}/>
            <TailSpin
              width={50}
              height={50}
              color = "var(--primaryColor)"
              wrapperStyle={{
                width: "40px",
                height:"40px",
                padding: "0px",
                background:"none",
                margin: "0 auto"
              }}
            />
          </div>
        </div>
      );
    }

  }
}
