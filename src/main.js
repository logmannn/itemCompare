import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  // $('#weatherLocation').click(function() {
    // let city = $('#location').val();
    // $('#location').val("");

  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.bestbuy.com/v1/products(categoryPath.name="All%20Flat-Panel%20TVs")?format=json&show=sku,name,salePrice&sort=salesRankMediumTerm.asc&apiKey=OoisIQjnBk1LJsHxUacZVYJt`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    let body = JSON.parse(response);
    console.log(body.products);

    let simpleProductArray = [];
    body.products.forEach(function(element) {
      simpleProductArray.push(element.name+ " " + element.salePrice);
    });

    simpleProductArray.forEach(function(element) {
      $(".output").append("<p>" + element + "</p>");
    });
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });
  // });
});

// $('.showHumidity').text(`The SKU is ${body.products.sku}%`);
