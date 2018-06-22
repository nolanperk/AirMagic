import axios from 'axios';

axios.get(`https://api.airtable.com/v0/apps7GoAgK23yrOoY/Customers?api_key=keyAaCNsMH8G57OW4`)
.then(response => {
  this.setState({
    pics: response.data
  });
}).then(e => {
  setTimeout((function() {
    this.setState({
      feedLoading: false
    });
  }).bind(this), 1000);
})
.catch(error => {
  console.log('Error fetching and parsing data', error);
});
