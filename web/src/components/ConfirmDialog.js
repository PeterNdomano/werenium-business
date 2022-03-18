import React, { Component } from 'react';
import $ from 'jquery';

export default class ConfirmDialog extends Component{

  constructor(props){
    super(props);
  }

  UNSAFE_componentWillReceiveProps(props){
    if(props.showDialog === true){
      $('#confirmDialog').modal().show();
    }
  }
  componentDidMount(){
    if(this.props.showDialog === true){
      $('#confirmDialog').modal().show();
    }
  }

  execute = () => {
    $('#dialogCloser').click();
    this.props.action();
  }
  render(){
    return (
      <div>
        {/* modal */}
        <div className="modal fade" id="confirmDialog" tabIndex="-1" role="dialog" aria-labelledby="confirmDialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 style={{ color:"var(--accentColor)" }} className="modal-title font-bold" id="exampleModalLongTitle">Confirm Dialog</h5>
              </div>
              <div className="modal-body">
                {this.props.msg}
              </div>
              <div className="modal-footer">
                <button id="dialogCloser" type="button" className="btn btn-sm font-regular" data-dismiss="modal" style={{ width:"100px", color:"var(--darkColor)", background:"none"  }}>
                  Cancel
                </button>
                <button onClick={this.execute} type="button" className="btn btn-sm font-regular" style={{ width:"100px", color:"var(--darkColor)", background:"var(--accentColor)"  }}>
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* modal end*/}
      </div>
    );
  }
}
