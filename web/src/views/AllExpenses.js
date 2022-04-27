import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { MDBInput } from 'mdbreact';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import NewSale from '../views/NewSale';
import OneExpense from '../ones/OneExpense';
import $ from 'jquery';

export default class AllExpenses extends Component{
  //NOTE:: incomes == expenses coz this was copied from AllIncomes.js
  constructor(props){
    super(props);

    this.state = {
      gotincomes: false,
      filterString: '',
      batchIndex: 0,
    };

    this.incomesShow = getLoader();
    this.pagination = '';
    this.incomes = [];
    this.incomesFiltered = [];
    this.maxItems = 30;
    this.incomesValue = 0;
  }

  componentDidMount(){
    (
      async () => {
        await this.getIncomes();
        this.setIncomesShow();
      }
    )();
  }

  UNSAFE_componentWillReceiveProps(props){
    (
      async () => {
        await this.getIncomes();
        this.setIncomesShow();
      }
    )();
  }

  handleFilter = (e) => {
    let str = e.target.value;
    this.setIncomesShow(str);
    this.setState({
      filterString: str,
    });
  }

  getIncomes = async (show = false) => {
    let incomes = await this.props.business.getExpenses();
    incomes.forEach((item, index) => {
      if(Number(item.amountPaid) > 0){
        this.incomes.push(item);
      }
    });
    
    this.setIncomesValue();
    if(show){
      this.setIncomesShow();
    }
  }

  setIncomesValue = () => {
    let value = 0;
    this.incomes.forEach((item)=> {
      value += Number(item.amountPaid);
    });
    this.incomesValue = value;
    if(this.props.showTotal === true){
      document.getElementById('_totalExpenseDisplay').innerHTML = numberFormat(this.incomesValue);
    }
  }

  setIncomesShow = (filterStr = '', bIndex = 0) => {
    if(filterStr.trim().length > 0){
      //handle filtering

      this.incomesShow = getLoader();
      this.incomesFiltered = [];
      this.incomes.forEach((item, index) => {
        if(String(item.description).toLowerCase().indexOf(filterStr) > -1){
          this.incomesFiltered.push(item);
        }
      });

      if(this.incomesFiltered.length > 0){
        let limit = this.maxItems;
        let startIndex = getStartIndex(this.maxItems, bIndex);
        this.incomesShow = this.incomesFiltered.map((item, index) => {
          if(limit > 0){
            if(index >= startIndex){
              --limit;
              return (
                <OneExpense reload={this.props.reload} openViewer={this.props.openViewer} business={this.props.business} getIncomes={this.getIncomes} showDialogView={this.props.showDialogView} openViewer={this.props.openViewer} business={this.props.business} showDialog={this.props.showDialog} key={item.id} item={item}/>
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
        this.setPagination(this.incomesFiltered, bIndex);
        this.setState((prevState) => ({
          gotIncomes: !(prevState.gotIncomes),
        }));
      }
      else{
        this.pagination = '';
        this.incomesShow = <h6>No item matches your search</h6>;
      }
    }
    else{
      let limit = this.maxItems;
      let startIndex = getStartIndex(this.maxItems, bIndex);
      if(this.incomes.length > 0){
        this.incomesShow = this.incomes.map((item, index) => {
          if(limit > 0){
            if(index >= startIndex){
              --limit;
              return (
                <OneExpense reload={this.props.reload}  openViewer={this.props.openViewer} business={this.props.business} getIncomes={this.getIncomes} showDialogView={this.props.showDialogView} openViewer={this.props.openViewer} business={this.props.business} showDialog={this.props.showDialog} key={item.id} item={item}/>
              );
            }
          }
          else{
            if(limit === 0){
              this.lastIndex = index;
            }
          }
        });
        this.setPagination(this.incomes, bIndex);
        this.setState((prevState) => ({
          gotIncomes: !(prevState.gotIncomes),
        }));
      }
      else{
        this.pagination = '';
        this.incomesShow = <div className="text-center">No Income records were found</div>
        this.setState((prevState) => ({
          gotIncomes: !(prevState.gotIncomes),
        }));
      }
    }
  }

  pageTo = (index) => {
    //console.log(index)
    this.setIncomesShow(this.state.filterString, index);
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
          <MDBInput value={this.state.filterString} onChange={(e) => {this.handleFilter(e)}} style={{ }} label="Filter income records by description" size="sm" icon="search" />
        </div>
        <div style={{ width:"100%"}}>
          {this.incomesShow}
        </div>

        <div style={{ width:"100%"}} className="text-center">
          {this.pagination}
        </div>
      </div>
    );
  }
}
