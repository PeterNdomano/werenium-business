import React, { Component, Fragment } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import ViewIncome from '../views/ViewIncome';
import EditSale from '../views/EditSale';
import { tellUser, thousandSeps } from '../Helper';

export default class OneIncome extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  delete = () => {
    if(this.props.item.refId === 0){
      this.props.showDialog( async () => {
        await this.props.business.deleteReceivableAccounts(this.props.item.id).then((result) => {
          if(result === true){
            tellUser('Item was deleted');
            this.props.reload();
          }
          else{
            tellUser('Deleting failed..');
          }
        })
      }, 'This item and its related accounts(debts, income etc..) will be deleted completely');
    }
    else{
      tellUser('Income is linked to '+this.props.item.ref);
      tellUser('Delete it from '+this.props.item.ref+' menu');
    }
  }



  view = () => {
    this.props.showDialogView(
      <ViewIncome item={this.props.item}  business={this.props.business}/>,
      "Viewing Income"
    );
  }

  render(){
    return (
      <div className="OneSale">
        <div className="mContainer text-left">
          <h6 className="mAmount">
            {thousandSeps(this.props.item.amountPaid)}
            <span style={{ fontSize:"14px" }}>
              &nbsp;&nbsp;
              {this.props.business.info.currency}
            </span>
          </h6>
          <h6 className="mTitle">
          {this.props.item.ref}
          </h6>
          <h6 style={{ fontSize: "12px"}}>
            {"Date: "+this.props.item.date.getFullYear()+" / "+this.props.item.date.getMonth()+" / "+this.props.item.date.getDate()}
          </h6>
        </div>

        <div className="mContainer text-right">
          <button onClick={() => this.view()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Edit">
            <MdInfo className="mIcon"/>
          </button>
          <button onClick={() => this.delete()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
            <MdDelete className="mIcon"/>
          </button>
        </div>

        <hr/>
      </div>
    )
  }
}
