import React, { Component } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';

export default class OneStock extends Component{
  render(){
    return (
      <div className="OneStock">
        <div className="mContainer text-left">
          <h6 className="mAmount">
            30000
            <span style={{ fontSize:"14px" }}>&nbsp;&nbsp; units</span>
          </h6>
          <h6 className="mTitle">Title</h6>
        </div>
        <div className="mContainer text-right">
          <button className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Edit">
            <MdEdit className="mIcon"/>
          </button>
          <button className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="View">
            <MdInfo className="mIcon"/>
          </button>
          <button className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
            <MdDelete className="mIcon"/>
          </button>
        </div>
        <hr/>
      </div>
    )
  }
}
