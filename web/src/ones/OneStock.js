import React, { Component } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import ViewStock from '../views/ViewStock';
import EditStock from '../views/EditStock';
import { tellUser } from '../Helper';

export default class OneStock extends Component{

  delete = () => {
    this.props.showDialog( async () => {
      await this.props.business.deleteStock(this.props.item.id).then((result) => {
        if(result === true){
          tellUser('Item was deleted');
          this.props.getStock(true);
        }
        else{
          tellUser('Deleting failed..');
        }
      })
    }, this.props.item.title+' will be deleted completely from your stock');
  }

  view = () => {
    this.props.showDialogView(<ViewStock item={this.props.item}/>, "Viewing Stock Item");
  }

  edit = () => {
    this.props.showDialogView(<EditStock getStock={this.props.getStock} business={this.props.business} item={this.props.item}/>, "Editing Stock Item");
  }
  render(){
    return (
      <div className="OneStock">
        <div className="mContainer text-left">
          <h6 className="mAmount">
            {this.props.item.quantity}
            <span style={{ fontSize:"14px" }}>
              &nbsp;&nbsp;
              {this.props.item.unit}
              {(this.props.item.quantity > 0) ? 's' : ''}
            </span>
          </h6>
          <h6 className="mTitle">{this.props.item.title}</h6>
        </div>
        <div className="mContainer text-right">
          <button onClick={() => this.edit()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Edit">
            <MdEdit className="mIcon"/>
          </button>
          <button onClick={() => this.view()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="View">
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
