import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { fetchUser } from "../actions/userActions";
import { fetchTweets } from "../actions/tweetsActions";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  setStartDate,
  setEndDate,
  queryAllAgencies
} from "../actions/billingActions";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

const options = {
  page: 1, // which page you want to show as default
  sizePerPage: 20, // which size per page you want to locate as default
  pageStartIndex: 1, // where to start counting the pages
  paginationSize: 3, // the pagination bar size.
  prePage: "Prev", // Previous page button text
  nextPage: "Next", // Next page button text
  firstPage: "First", // First page button text
  lastPage: "Last", // Last page button text
  prePageTitle: "Go to previous", // Previous page button title
  nextPageTitle: "Go to next", // Next page button title
  firstPageTitle: "Go to first", // First page button title
  lastPageTitle: "Go to Last", // Last page button title
  paginationPosition: "top", // default is bottom, top and both is all available
  // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
  hideSizePerPage: true //> You can hide the dropdown for sizePerPage
  // alwaysShowAllBtns: true // Always show next and previous button
  // withFirstAndLast: false > Hide the going to First and Last page button
  // hidePageListOnlyOnePage: true > Hide the page list if only one page.
};

@connect(store => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
    data: store.state
  };
})
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleQueryAllAgencies = this.handleQueryAllAgencies.bind(this);
    this.renderRelevantData = this.renderRelevantData.bind(this);
    this.renderAllAgencies = this.renderAllAgencies.bind(this);
  }

  handleStartDate(e) {
    this.props.dispatch(setStartDate(e.target.value));
  }

  handleEndDate(e) {
    this.props.dispatch(setEndDate(e.target.value));
  }

  handleQueryAllAgencies() {
    var url =
      "http://localhost:8080/billing?start=" +
      this.props.data.startDate +
      "&end=" +
      this.props.data.endDate;

    this.props.dispatch(queryAllAgencies(url));
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  renderRelevantData() {
    // return (<div>Hello Data </div>);
    return this.renderAllAgencies();
  }

  renderAllAgencies() {
    return (
      <div>
        <div class="row top-buffer">
          <BootstrapTable
            data={this.props.data.allAgencyData}
            pagination={true}
            exportCSV={false}
            options={options}
          >
            <TableHeaderColumn dataField="key" isKey={true} hidden={true}>
              Key
            </TableHeaderColumn>
            <TableHeaderColumn dataField="agencyID">
              Agency ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="agencyName">
              Agency Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="created">
              Created
            </TableHeaderColumn>
            <TableHeaderColumn dataField="departmentName">
              Dept Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="fileName">
              File Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="isci">
              ISCI
            </TableHeaderColumn>
            <TableHeaderColumn dataField="length">
              Length
            </TableHeaderColumn>
            <TableHeaderColumn dataField="mediaID">
              Media ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="mediaName">
              Media Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="mediaTypeName">
              Media Type Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="po">
              PO
            </TableHeaderColumn>
            <TableHeaderColumn dataField="productName">
              Product Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="recallStatus">
              Recall Status
            </TableHeaderColumn>
            <TableHeaderColumn dataField="sentBy">
              Sent By
            </TableHeaderColumn>
            <TableHeaderColumn dataField="submitterName">
              Submitter Name
            </TableHeaderColumn>

          </BootstrapTable>

        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-4">
            <form class="row top-buffer">
              <FormGroup>
                <div class="row top-buffer">
                  <ControlLabel class="col-sm-1">StartDate</ControlLabel>
                  <FormControl
                    class="col-sm-3"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    onChange={this.handleStartDate}
                  />
                </div>
                <div class="row top-buffer">
                  <ControlLabel class="col-sm-1">EndDate</ControlLabel>
                  <FormControl
                    class="col-sm-3"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    onChange={this.handleEndDate}
                  />
                </div>
                <Button
                  class="row top-buffer"
                  onClick={this.handleQueryAllAgencies}
                >
                  All Agencies
                </Button>
              </FormGroup>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">{this.renderRelevantData()}</div>
        </div>
      </div>
    );
  }
}
