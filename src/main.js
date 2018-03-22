import './styles.css';
import { getItem } from "../src/getItem.js";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {

  $('.btn-success').click(function(event){
    event.preventDefault();
    let search = $("#search").val();
    $(".output").empty();
    let url = `https://api.bestbuy.com/v1/products(search=${search})?format=json&show=sku,upc,name,salePrice&apiKey=OoisIQjnBk1LJsHxUacZVYJt&pageSize=5`;
    getItem(fetchResults, badResults, search, url);

    url = `http://api.walmartlabs.com/v1/search?apiKey=vwaczxtbwhzbpjk59pkrnpua&query=${search}&categoryId=3944&sort=price&order=asc&numItems=5`;
    getItem(fetchResults, badResults, search, url);
  });
});

let fetchResults = function(response, url){
  let items = JSON.parse(response);
  let i = 0;

  if (url.match(/walmartlabs/)) {
    console.log(url);
    items.items.forEach(function(item) {
      $(".bestbuyoutput").append(items.items[i].name + " " + items.items[i].upc + " $" + items.items[i].salePrice + "<br>");
      i += 1;
    });
  }

  if (url.match(/bestbuy/)) {
    items.products.forEach(function(item) {
      console.log(items.products[i]);
      $(".walmartoutput").append(items.products[i].name + " " + items.products[i].upc + " $" + items.products[i].salePrice + "<br>");
      i += 1;
    });
  }

}

let badResults = function(error){
  $("#results").text("There was an error processing your request");
}
// $('.showHumidity').text(`The SKU is ${body.products.sku}%`);
