import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { fetchUser } from "../actions/userActions";
import { fetchTweets } from "../actions/tweetsActions";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import {
  setStartDate,
  setEndDate,
  setAgencyID,
  setUserID,
  queryAllAgencies,
  queryByAgency,
  queryByUser
} from "../actions/billingActions";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar
} from "react-bootstrap";
import * as types from "../constants/type";

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
    
    this.handleAgencyID = this.handleAgencyID.bind(this);
    this.handleUserID = this.handleUserID.bind(this);

    this.handleQueryAllAgencies = this.handleQueryAllAgencies.bind(this);
    
    this.renderRelevantData = this.renderRelevantData.bind(this);
    this.renderAllAgencies = this.renderAllAgencies.bind(this);
    
    this.handleQueryByAgencyID = this.handleQueryByAgencyID.bind(this);
    this.handleQueryByUserID = this.handleQueryByUserID.bind(this);
  }

  handleStartDate(e) {
    this.props.dispatch(setStartDate(e.target.value));
  }

  handleEndDate(e) {
    this.props.dispatch(setEndDate(e.target.value));
  }

  handleAgencyID(e) {
    this.props.dispatch(setAgencyID(e.target.value));
  }

  handleUserID(e) {
    this.props.dispatch(setUserID(e.target.value));
  }

  handleQueryAllAgencies() {
    var url =
      "http://localhost:8080/billing?start=" +
      this.props.data.startDate +
      "&end=" +
      this.props.data.endDate;

    this.props.dispatch(queryAllAgencies(url));
  }

  handleQueryByAgencyID() {
    var url =
      "http://localhost:8080/billing/agency/" +
      this.props.data.agencyID +
      "?start=" +
      this.props.data.startDate +
      "&end=" +
      this.props.data.endDate;

    this.props.dispatch(queryByAgency(url));
  }

  handleQueryByUserID() {
    var url =
      "http://localhost:8080/billing/user/" +
      this.props.data.userID +
      "?start=" +
      this.props.data.startDate +
      "&end=" +
      this.props.data.endDate;

    this.props.dispatch(queryByUser(url));
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  renderRelevantData() {
    switch (this.props.data.dataType) {
      case types.ALL_AGENCIES_DATA:
        return this.renderAllAgencies();
      case types.SINGLE_AGENCY_DATA:
        return this.renderByAgency();
      default:
        return <div />;
    }
  }

  renderByAgency() {
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
            <TableHeaderColumn dataField="ForwardedMedia">
              Forwarded Media
            </TableHeaderColumn>
            <TableHeaderColumn dataField="MediaExportName">
              Media Export Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="PO#/Job#">
              PO
            </TableHeaderColumn>
            <TableHeaderColumn dataField="created">
              Created
            </TableHeaderColumn>
            <TableHeaderColumn dataField="departmentname">
              Dept
            </TableHeaderColumn>
            <TableHeaderColumn dataField="isci">
              ISCI
            </TableHeaderColumn>
            <TableHeaderColumn dataField="length">
              Length
            </TableHeaderColumn>
            <TableHeaderColumn dataField="mediaid">
              Media ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="medianame">
              Media Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="mediatypename">
              Media Type Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="productname">
              Product Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="recallstatus">
              Recall Status
            </TableHeaderColumn>
            <TableHeaderColumn dataField="sentBy">
              Sent By
            </TableHeaderColumn>
            <TableHeaderColumn dataField="submittername">
              Submitter Name
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
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
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <form class="row top-buffer">
              <FormGroup>
                <div class="row top-buffer">
                  <FormControl
                    class="col-sm-3"
                    type="text"
                    placeholder="Start Date in YYYY-MM-DD"
                    onChange={this.handleStartDate}
                  />
                </div>
                <div class="row top-buffer">
                  <FormControl
                    class="col-sm-3"
                    type="text"
                    placeholder="End Date in YYYY-MM-DD"
                    onChange={this.handleEndDate}
                  />
                </div>
                <div class="row top-buffer">
                  <FormControl
                    class="col-sm-3"
                    type="text"
                    placeholder="Agency ID"
                    onChange={this.handleAgencyID}
                  />
                </div>
                <div class="row top-buffer">
                  <FormControl
                    class="col-sm-3"
                    type="text"
                    placeholder="User ID"
                    onChange={this.handleUserID}
                  />
                </div>
                <div class="row top-buffer">
                  <span>
                    <ButtonToolbar>
                      <Button onClick={this.handleQueryAllAgencies}>
                        All Agencies
                      </Button>
                      <Button onClick={this.handleQueryByAgencyID}>
                        By Agency
                      </Button>
                      <Button onClick={this.handleQueryByUserID}>
                        By User
                      </Button>
                    </ButtonToolbar>
                  </span>
                </div>
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
