'use strict';

var React = require('react-native');
var DataCell = require('./DataCell.js');
var CoffeeShop = require('./CoffeeShop.js');

var CLIENT_ID = "AREWTY4KWJEDLALROY0VZWTJ5XFTCITLH2LXZU3WP2OJ1MQW";
var CLIENT_SECRET = "M2JLJHXBY2CO2V1F05XZMCH3U143BO5MTFDK3MRV0WB5DSG0";
var REQUEST_URL = "https://api.foursquare.com/v2/venues/search?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v=20130815&ll=40.7,-74&query=coffee"

var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  Image
} = React;

class ListViewData extends React.Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      var coffees = responseData.response.venues.map(function(currentItem) {
        return new  CoffeeShop({
          name: currentItem.name
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(coffees)
      });
    })
    .done();
  }

  componentDidMount() {
    this.fetchData();
  }

  renderRow(currentRow) {
    return (
      <DataCell coffeeShop={currentRow}/>
    );
  }

  render() {
    console.log("render list");
    return (
      <ListView style={styles.list}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
      />
    );
  }
}

var styles = StyleSheet.create({
  list: {
    backgroundColor: 'gray'
  }
});

module.exports = ListViewData;