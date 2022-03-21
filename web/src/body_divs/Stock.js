import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import OneStock from '../ones/OneStock';
import { MDBInput } from 'mdbreact';
import AddStock from '../views/AddStock';
import $ from 'jquery';


export default class Stock extends Component{

  constructor(props){
    super(props);
    this.state = {
      gotStock: false,
      filterString: '',
      batchIndex: 0,
    };

    this.stockShow = getLoader();
    this.pagination = '';
    this.stock = [];
    this.stockFiltered = [];
    this.maxItems = 50;
    this.stockValue = 0

  }

  handleFilter = (e) => {
    let str = e.target.value;
    this.setStockShow(str);
    this.setState({
      filterString: str,
    });
  }

  addStock = () => {
    this.props.openViewer(
      "Add Items To Stock",
      <AddStock  business={this.props.business}/>
    );
  }

  getStock = async (show = false) => {
    this.stock = await this.props.business.getStock();
    this.setStockValue();
    if(show){
      this.setStockShow();
    }
  }

  setStockValue = () => {
    let value = 0;
    this.stock.forEach((item)=> {
      value += (item.quantity * item.bPrice);
    });
    this.stockValue = value;
  }
  setStockShow = (filterStr = '', bIndex = 0) => {
    if(filterStr.trim().length > 0){
      //handle filtering
      this.stockShow = getLoader();
      this.stockFiltered = [];
      this.stock.forEach((item, index) => {
        if(item.title.indexOf(filterStr) > -1){
          this.stockFiltered.push(item);
        }
      });

      if(this.stockFiltered.length > 0){
        let limit = this.maxItems;
        let startIndex = getStartIndex(this.maxItems, bIndex);
        this.stockShow = this.stockFiltered.map((item, index) => {
          if(limit > 0){
            if(index >= startIndex){
              --limit;
              return (
                <OneStock business={this.props.business} getStock={this.getStock} showDialogView={this.props.showDialogView} openViewer={this.props.openViewer} business={this.props.business} showDialog={this.props.showDialog} key={item.id} item={item}/>
              );
            }
          }
          else{
            if(limit === 0){
              this.lastIndex = index;
            }
          }
        });
        //re-render caused by changing state of filter text
        this.setPagination(this.stockFiltered, bIndex);
        this.setState((prevState) => ({
          gotStock: !(prevState.gotStock),
        }));
      }
      else{
        this.pagination = '';
        this.stockShow = <h6>No stock item matches your search</h6>;
      }
    }
    else{
      let limit = this.maxItems;
      let startIndex = getStartIndex(this.maxItems, bIndex);
      if(this.stock.length > 0){
        this.stockShow = this.stock.map((item, index) => {
          if(limit > 0){
            if(index >= startIndex){
              --limit;
              return (
                <OneStock business={this.props.business} getStock={this.getStock} showDialogView={this.props.showDialogView} openViewer={this.props.openViewer} business={this.props.business} showDialog={this.props.showDialog} key={item.id} item={item}/>
              );
            }
          }
          else{
            if(limit === 0){
              this.lastIndex = index;
            }
          }
        });
        this.setPagination(this.stock, bIndex);
        this.setState((prevState) => ({
          gotStock: !(prevState.gotStock),
        }));
      }
      else{
        this.pagination = '';
        this.stockShow = <div className="text-center">No stock was found</div>
        this.setState((prevState) => ({
          gotStock: !(prevState.gotStock),
        }));
      }
    }
  }

  pageTo = (index) => {
    //console.log(index)
    this.setStockShow(this.state.filterString, index);
    this.setState({
      batchIndex: index,
    }, () => {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    })
  }

  setPagination = (arr, currentIndex = 0) => {
    //console.log(arr.length / this.maxItems);
    let noPages = Math.trunc(arr.length / this.maxItems);
    let pages = [];
    for(let i = 0; i <= noPages; i++){
      pages.push(i);
    }

    let pgBtns = '';

    pgBtns = pages.map((item, i) => {
      return (
        <li onClick={() => { this.pageTo(item) }} key={currentIndex+"_"+i} className={(item === currentIndex) ? "page-item active" : "page-item"}>
          <a className="page-link">{Number(item) + 1}</a>
        </li>
      )
    });

    let prevIndex = currentIndex - 1;
    let nextIndex = currentIndex + 1;
    let prevBtn = '';
    let nextBtn = '';

    if(pages.indexOf(prevIndex) > -1){
      prevBtn = (
        <li key={"prev"} className={"page-item"} onClick={() => { this.pageTo(prevIndex) }}>
          <a className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
      )
    }

    if(pages.indexOf(nextIndex) > -1){
      nextBtn = (
        <li key={"next"} className="page-item" onClick={() => { this.pageTo(nextIndex) }}>
          <a className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      )
    }

    this.pagination = (
      <nav aria-label="Navigation Pagination">
        <ul className="pagination pagination-sm">
        {prevBtn}
        {pgBtns}
        {nextBtn}
        </ul>
      </nav>
    )
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
                      <h1>{numberFormat(this.stock.length)}</h1>
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
                      <h1>{numberFormat(this.stockValue, 1)}</h1>
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
                  <MDBInput value={this.state.filterString} onChange={(e) => {this.handleFilter(e)}} style={{ }} label="Filter stock list by title" size="sm" icon="search" />
                </div>

                <div style={{ width:"100%"}}>
                  {this.stockShow}
                </div>

                <div style={{ width:"100%"}} className="text-center">
                  {this.pagination}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
