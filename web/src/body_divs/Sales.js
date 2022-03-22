import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import NewSale from '../views/NewSale';

export default class Sales extends Component{

  newSale = () => {
    this.props.openViewer(
      "Make New Sale",
      <NewSale  business={this.props.business}/>
    );
  }


  render(){
    return (
      <div className="container Stock">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="row">

              <div className="col-md-6 col-sm-12">
                <div className="card introCard bg-warning">
                  <div className="d-flex">
                    <div className="p-1 align-self-center">
                      <AiOutlineStock className="mIcon"/>
                    </div>
                    <div className="align-self-center flex-grow-1 text-right p-2">
                      <h1>{numberFormat(10000)}</h1>
                      <h6>Total Sales Value in {this.props.business.info['currency']}</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="card introCard" style={{ cursor:"pointer" }}>
                  <button onClick={() => this.newSale()} style={{ width:"100%", height:"100%", margin:"0px"}} className="btn btn-success">
                    <AiOutlineAppstoreAdd className="mIcon"/><br/>
                    <h6>Make New Sale</h6>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
