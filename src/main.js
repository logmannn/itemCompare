import './styles.css';
import { getItem } from "../src/getItem.js";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {

  $('.btn-success').click(function(event){
    event.preventDefault();
    let search = $("#search").val();
    getItem(fetchResults, badResults, search);
  });
});

let fetchResults = function(response){
  let items = JSON.parse(response);
  let i = 0;
  items.products.forEach(function(item) {
    console.log(items.products[i]);
    $(".bestbuyoutput").append(items.products[i].name + " " + items.products[i].upc + " $" + items.products[i].salePrice + "<br>");
    i += 1;
  });

  // $(".bestbuyoutput").append(items.product);
  // response.forEach(function(item) {
  //
  // });
}

let badResults = function(error){
  $("#results").text("There was an error processing your request");
}
// $('.showHumidity').text(`The SKU is ${body.products.sku}%`);
