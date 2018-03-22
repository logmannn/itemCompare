import './styles.css';
import { getItem } from "../src/getItem.js";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {
  // console.log("test "+process.env.WALMART_API_KEY);
  // console.log("test "+process.env.BESTBUY_API_KEY);
  $('.btn-success').click(function(event){
    event.preventDefault();
    let search = $("#search").val();
    $(".output").empty();

    let url = `https://api.bestbuy.com/v1/products(search=${search})?format=json&show=sku,upc,name,salePrice&apiKey=${process.env.BESTBUY_API_KEY}&pageSize=25`;
    getItem(fetchResults, badResults, search, url);

    url = `http://api.walmartlabs.com/v1/search?apiKey=${process.env.WALMART_API_KEY}&query=${search}&categoryId=3944&sort=price&order=asc&numItems=25`;
    getItem(fetchResults, badResults, search, url);
  });
});

let fetchResults = function(response, url){
  let items = JSON.parse(response);
  let i = 0;

  if (url.match(/walmartlabs/)) {
    console.log(url);
    items.items.forEach(function(item) {
      $(".walmartoutput").append(items.items[i].name + " " + items.items[i].upc + " $" + items.items[i].salePrice + "<br>");
      i += 1;
    });
  }

  if (url.match(/bestbuy/)) {
    items.products.forEach(function(item) {
      console.log(items.products[i]);
      $(".bestbuyoutput").append(items.products[i].name + " " + items.products[i].upc + " $" + items.products[i].salePrice + "<br>");
      i += 1;
    });
  }

}

let badResults = function(error){
  $("#results").text("There was an error processing your request");
}
// $('.showHumidity').text(`The SKU is ${body.products.sku}%`);
