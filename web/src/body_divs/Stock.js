import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader } from '../Helper';
import OneStock from '../ones/OneStock';
import { MDBInput } from 'mdbreact';
import AddStock from '../views/AddStock';


export default class Stock extends Component{

  constructor(props){
    super(props);
    this.state = {
      gotStock: false,
    };

    this.stockShow = getLoader();
    this.stock = [];
    this.maxItems = 10;

  }

  addStock = () => {
    this.props.openViewer(
      "Add Items To Stock",
      <AddStock  business={this.props.business}/>
    );
  }

  getStock = async (show = false) => {
    this.stock = await this.props.business.getStock();
    if(show){
      this.setStockShow();
    }
  }

  setStockShow = () => {
    let limit = this.maxItems;
    if(this.stock.length > 0){
      this.stockShow = this.stock.map((item, index) => {
        if(limit > 0){
          --limit;
          return (
            <OneStock business={this.props.business} getStock={this.getStock} showDialogView={this.props.showDialogView} openViewer={this.props.openViewer} business={this.props.business} showDialog={this.props.showDialog} key={item.id} item={item}/>
          );
        }
        else{
          if(limit === 0){
            this.lastIndex = index;
          }
        }
      });

      this.setState((prevState) => ({
        gotStock: !(prevState.gotStock),
      }));
    }
    else{
      this.stockShow = <div className="text-center">No stock was found</div>
      this.setState((prevState) => ({
        gotStock: !(prevState.gotStock),
      }));
    }
  }

  componentDidMount(){
    (
      async () => {
        await this.getStock();
        this.setStockShow();
      }
    )();
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
                  {this.stockShow}
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
