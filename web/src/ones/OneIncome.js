import React, { Component, Fragment } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import ViewInvoice from '../views/ViewInvoice';
import EditSale from '../views/EditSale';
import { tellUser, thousandSeps } from '../Helper';

export default class OneIncome extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  delete = () => {

  }



  view = () => {

  }

  render(){
    return (
      <div className="OneSale">
        <div className="mContainer text-left">
          <h6 className="mAmount">
            {thousandSeps(this.props.item.amount)}
            <span style={{ fontSize:"14px" }}>
              &nbsp;&nbsp;
              {this.props.business.info.currency}
            </span>
          </h6>
          <h6 className="mTitle">
          {this.props.item.description}
          </h6>
          <h6 style={{ fontSize: "12px"}}>
            {"Date: "+this.props.item.date.getFullYear()+" / "+this.props.item.date.getMonth()+" / "+this.props.item.date.getDate()}
          </h6>
        </div>

        <div className="mContainer text-right">
          <Fragment>
            <button onClick={() => {}} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Edit">
              <MdEdit className="mIcon"/>
            </button>
            <button onClick={() => {}} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
              <MdDelete className="mIcon"/>
            </button>
          </Fragment>
        </div>

        <hr/>
      </div>
    )
  }
}
