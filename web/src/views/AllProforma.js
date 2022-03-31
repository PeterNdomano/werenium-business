import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { MDBInput } from 'mdbreact';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import NewSale from '../views/NewSale';
import OneSale from '../ones/OneSale';
import $ from 'jquery';

export default class AllProforma extends Component{

  constructor(props){
    super(props);

    this.state = {
      gotSales: false,
      filterString: '',
      batchIndex: 0,
    };

    this.salesShow = getLoader();
    this.pagination = '';
    this.sales = [];
    this.salesFiltered = [];
    this.maxItems = 30;
    this.salesValue = 0;
  }

  componentDidMount(){
    (
      async () => {
        await this.getSales();
        this.setSalesShow();
      }
    )();
  }

  handleFilter = (e) => {
    let str = e.target.value;
    this.setSalesShow(str);
    this.setState({
      filterString: str,
    });
  }

  getSales = async (show = false) => {
    this.sales = [];
    this.salesB = await this.props.business.getSales();
    this.salesB.forEach((item) => {
      if(item.proforma === true){
        this.sales.push(item);
      }
    });
    this.setSalesValue();
    if(show){
      this.setSalesShow();
    }
  }

  setSalesValue = () => {
    let value = 0;
    this.sales.forEach((item)=> {
      if(item.proforma === false){
        value += (item.data.total);
      }
    });
    this.salesValue = value;
  }

  setSalesShow = (filterStr = '', bIndex = 0) => {
    if(filterStr.trim().length > 0){
      //handle filtering

      this.salesShow = getLoader();
      this.salesFiltered = [];
      this.sales.forEach((item, index) => {
        if(String(item.data.customerName).toLowerCase().indexOf(filterStr) > -1){
          this.salesFiltered.push(item);
        }
      });

      if(this.salesFiltered.length > 0){
        let limit = this.maxItems;
        let startIndex = getStartIndex(this.maxItems, bIndex);
        this.salesShow = this.salesFiltered.map((item, index) => {

          if(limit > 0){
            if(index >= startIndex){
              --limit;
              if(item.proforma === true){
                return (
                  <OneSale  proforma={true} openViewer={this.props.openViewer} business={this.props.business} getSales={this.getSales} showDialogView={this.props.showDialogView} openViewer={this.props.openViewer} business={this.props.business} showDialog={this.props.showDialog} key={item.id} item={item}/>
                );
              }
              else{
                return '';
              }
            }
          }
          else{
            if(limit === 0){
              this.lastIndex = index;
            }
          }
        });
        //re-render caused by changing state of filter text
        this.setPagination(this.salesFiltered, bIndex);
        this.setState((prevState) => ({
          gotSales: !(prevState.gotSales),
        }));
      }
      else{
        this.pagination = '';
        this.salesShow = <h6>No item matches your search</h6>;
      }
    }
    else{
      let limit = this.maxItems;
      let startIndex = getStartIndex(this.maxItems, bIndex);
      if(this.sales.length > 0){
        this.salesShow = this.sales.map((item, index) => {
          if(limit > 0){
            if(index >= startIndex){
              --limit;
              if(item.proforma === true){
                return (
                  <OneSale proforma={true} openViewer={this.props.openViewer} business={this.props.business} getSales={this.getSales} showDialogView={this.props.showDialogView} openViewer={this.props.openViewer} business={this.props.business} showDialog={this.props.showDialog} key={item.id} item={item}/>
                );
              }
              else{
                return '';
              }
            }
          }
          else{
            if(limit === 0){
              this.lastIndex = index;
            }
          }
        });
        this.setPagination(this.sales, bIndex);
        this.setState((prevState) => ({
          gotSales: !(prevState.gotSales),
        }));
      }
      else{
        this.pagination = '';
        this.salesShow = <div className="text-center">No proforma/estimates were found</div>
        this.setState((prevState) => ({
          gotSales: !(prevState.gotSales),
        }));
      }
    }
  }

  pageTo = (index) => {
    //console.log(index)
    this.setSalesShow(this.state.filterString, index);
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


  render(){
    return (
      <div className="container">
        <div style={{ width:"100%"}}>
          <MDBInput value={this.state.filterString} onChange={(e) => {this.handleFilter(e)}} style={{ }} label="Filter sales by customer name" size="sm" icon="search" />
        </div>
        <div style={{ width:"100%"}}>
          {this.salesShow}
        </div>

        <div style={{ width:"100%"}} className="text-center">
          {this.pagination}
        </div>
      </div>
    );
  }
}
