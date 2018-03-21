import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  // $('#weatherLocation').click(function() {
    // let city = $('#location').val();
    // $('#location').val("");

  // // //bestbuy
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.bestbuy.com/v1/products(search=ipod)?format=json&show=sku,upc,name,salePrice&apiKey=OoisIQjnBk1LJsHxUacZVYJt&pageSize=25`;
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
      simpleProductArray.push(element.name + " " + element.salePrice + " " + element.upc + " " + element.sku);
    });

    simpleProductArray.forEach(function(element) {
      $(".bestbuyoutput").append("<p>" + element + "</p>");
    });
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });

  // // //walmart
  promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `http://api.walmartlabs.com/v1/search?apiKey=vwaczxtbwhzbpjk59pkrnpua&query=ipod&categoryId=3944&sort=price&order=asc&numItems=25`;
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
    body.items.forEach(function(element) {
      simpleProductArray.push(element.name + " $" + element.salePrice + " " + element.upc);
    });
    console.log(simpleProductArray);

    simpleProductArray.forEach(function(element) {
      $(".walmartoutput").append("<p>" + element + "</p>");
    });
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });

  // });
});

// $('.showHumidity').text(`The SKU is ${body.products.sku}%`);
