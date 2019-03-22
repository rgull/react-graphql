import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export const GET_CUSTOMERS = gql`
query getCustomers($input: GetCustomersInput!) {
    getCustomers(input: $input) {
        totalCount
        results {
            id
            name
            slug
            type {
                name
                id
            }
            description
            excerpt
            phone
            email
            hours
            website
            regions {
                name
            }
            address {
                line1
                line2
                city
                state
                country
                cityAndState
                zipcode
                 lat
                 lng
                }
                varietals {
                    name
                }
                facebook
                twitter
                instagram
                linkedin
                wifi_password
                wifi_network
                amenities {
                    name
                    id
                }
            }
        }
    }
`
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {headerName: "Name", field: "name",minWidth: 100},
                {headerName: "Phone", field: "phone",minWidth: 100},
                {headerName: "Location", field: "address.city",minWidth: 100},
                {headerName: "Email", field: "email",minWidth: 100},
                {headerName: "Website", field: "website",minWidth: 100},

            ],
            rowData: [
                {make: "Toyota", model: "Celica", price: 35000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000}
            ]
}
    }
    render() {       
        return (
            <div style={{height:"100%", width:"100%"}}>
            <h1>Customer Listing</h1>
            <div className="ag-theme-balham" id="grid-wrapper"  style={{
                height: "100%",
                width: "100%"
              }}>               
                <Query query={GET_CUSTOMERS}  variables={this._getQueryVariables()}>
               {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Oops.... Error Ocured</p>;
                    console.log('Data: ',data.getCustomers.results);
                    return (
                    <AgGridReact enableSorting={true} pagination={true} columnDefs={this.state.columnDefs} 
                    rowData={data.getCustomers.results} onGridSizeChanged={this.onGridSizeChanged.bind(this)}>
                    </AgGridReact>
                    )                   
                }}
            </Query>
            </div>
            </div>
        );
    }
   
_getQueryVariables = () => {  
    return {"input": {"page": 1, "limit": 20}};
  }

  onGridSizeChanged(params) {
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }
}

export default Customer;