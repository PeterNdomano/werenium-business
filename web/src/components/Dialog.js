import React, { Component } from 'react';
import $ from 'jquery';
import { MdClose } from 'react-icons/md';

export default class Dialog extends Component{

  constructor(props){
    super(props);
  }

  UNSAFE_componentWillReceiveProps(props){
    this.initialize(props)
  }
  componentDidMount(){
    this.initialize(this.props)
  }

  initialize = (props) => {
    this.view = props.view;
    this.title = props.title;
    if(props.showDialogView === true){
      $('#dialog').modal().show();
    }
    this.render();
  }


  render(){
    //console.log(this.view);
    return (
      <div>
        {/* modal */}
        <div className="modal fade" id="dialog" tabIndex="-1" role="dialog" aria-labelledby="dialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 style={{ color:"var(--accentColor)" }} className="modal-title font-bold" id="exampleModalLongTitle">{this.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" style={{ color: "var(--darkColor)"}}><MdClose size={24} color="var(--darkColor)"/></span>
                </button>
              </div>
              <div className="modal-body">
                {this.view}
              </div>
              <button id="dialogCloser2" data-dismiss="modal" style={{ display:"none" }}>
                Close
              </button>

            </div>
          </div>
        </div>
        {/* modal end*/}
      </div>
    );
  }
}
