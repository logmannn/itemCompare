import $ from 'jquery';
// import fetchResults from "../src/main.js";

function getItem(fetchResults, badResults, search){

  let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.bestbuy.com/v1/products(search=${search})?format=json&show=sku,upc,name,salePrice&apiKey=OoisIQjnBk1LJsHxUacZVYJt&pageSize=5`;
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
        let i = 0;
        let productArray = [];
        body.products.forEach(function() {
          // console.log(body.products[i]);
          productArray.push(body.products[i]);
          i = i +1
        });
        fetchResults(response);
      }, function(error) {
        badResults (error);
      });
    // });
}

export { getItem };
