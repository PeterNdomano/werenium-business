import React, { Component, Fragment } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import ViewEmployee from '../views/ViewEmployee';
import EditSale from '../views/EditSale';
import { tellUser, thousandSeps } from '../Helper';

export default class OneIncome extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  delete = () => {
    this.props.showDialog( async () => {
      await this.props.business.deleteEmployee(this.props.item.id).then((result) => {
        if(result === true){
          tellUser('Customer was deleted');
          this.props.reload();
        }
        else{
          tellUser('Deleting failed..');
        }
      })
    }, 'This customer will be deleted completely');
  }



  view = () => {
    this.props.showDialogView(
      <ViewEmployee item={this.props.item}  business={this.props.business}/>,
      "Viewing Employee"
    );
  }

  render(){
    return (
      <div className="OneSale">
        <div className="mContainer text-left">
          <h6 className="mAmount">
            {this.props.item.fullname}
          </h6>
          <h6 style={{ fontSize: "12px"}}>
            {"Registered on: "+this.props.item.date.getFullYear()+" / "+this.props.item.date.getMonth()+" / "+this.props.item.date.getDate()}
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
