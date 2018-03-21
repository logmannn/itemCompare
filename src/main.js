import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { item } from './item.js';


$(document).ready(function() {
  $('#submit-search').submit(function(event){
    event.preventDefault();
    item($('#search').val());
  });
});

// $('.showHumidity').text(`The SKU is ${body.products.sku}%`);
