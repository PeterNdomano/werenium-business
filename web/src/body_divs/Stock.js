import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat } from '../Helper';
import OneStock from '../ones/OneStock';
import { MDBInput } from 'mdbreact';
import AddStock from '../views/AddStock';


export default class Stock extends Component{

  addStock = () => {
    this.props.openViewer(
      "Add Item To Stock",
      <AddStock business={this.props.business}/>
    );
  }


  render(){
    return (
      <div className="container Stock">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="card introCard bg-primary text-dark">
                  <div className="d-flex">
                    <div className="p-1 align-self-center">
                      <CgExtension className="mIcon"/>
                    </div>
                    <div className="align-self-center flex-grow-1 text-right p-2">
                      <h1>{numberFormat(3000)}</h1>
                      <h6>Stock Items</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="card introCard bg-warning">
                  <div className="d-flex">
                    <div className="p-1 align-self-center">
                      <AiOutlineStock className="mIcon"/>
                    </div>
                    <div className="align-self-center flex-grow-1 text-right p-2">
                      <h1>{numberFormat(3000)}</h1>
                      <h6>Stock Value in {this.props.business.info['currency']}</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="card introCard" style={{ cursor:"pointer" }}>
                  <button onClick={() => this.addStock()} style={{ width:"100%", height:"100%", margin:"0px"}} className="btn btn-success">
                    <AiOutlineAppstoreAdd className="mIcon"/><br/>
                    <h6>Add Stock</h6>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="col-sm-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <div style={{ width:"100%"}}>
                  <MDBInput style={{ }} label="Search stock list" size="sm" icon="search" />
                </div>

                <div style={{ width:"100%"}}>
                  <OneStock/>
                  <OneStock/>
                  <OneStock/>
                  <OneStock/>
                </div>

                <div style={{ width:"100%"}} className="text-center">
                  {/* pagination*/}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
