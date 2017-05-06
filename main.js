/**
 * Created by ljwwolfat on 5/5/17.
 */
var app = angular.module("MyApp", []);

app.controller("shopcart", function($scope, $http) {




//read the json file
    $http.get('items.json')
        .then(function(response) {
            $scope.items = response.data;
        })

    $scope.invoice = {
        datas: []
    };


//add to cart or add the number of items
    $scope.additem = function(itemName,itemPrice,itemRemaining,imgSrc) {
        var count=0,
            i=0;
        angular.forEach($scope.invoice.datas, function(data) {

            if(itemName==data.itemName){
                count++;
            }
        });
        if(itemRemaining==0){
            alert("No more left")
        }


        else if(count==0 && itemRemaining!=0){
        $scope.invoice.datas.push({
            itemName: itemName,
            price: itemPrice,
            quantity: 1,
            quantityRemaining: itemRemaining,
            imgSrc:imgSrc
        });}
        else
    {
        angular.forEach($scope.invoice.datas, function(data) {

            if(itemName==data.itemName){
                $scope.somemore(i,data.quantity,data.itemName,data.price,data.quantityRemaining,data.imgSrc)
            }
            i++;
        });
    }
    };

//remove the item from the cart
    $scope.removeItem = function(index) {
        $scope.invoice.datas.splice(index, 1);
    };
//empty the whole cart
    $scope.emptyCart =function () {
        $scope.invoice.datas=[];
    };

//update the information without changing the json file but also can update the file
//print the data of send the data to the payment page
    $scope.updatelist=function () {
        for(var j=0;j<$scope.invoice.datas.length;j++){
            for(var k=0;k<$scope.items.length;k++){
               if($scope.items[k].itemName==$scope.invoice.datas[j].itemName){
                   $scope.items[k].quantityRemaining=$scope.items[k].quantityRemaining-$scope.invoice.datas[j].quantity;
               }
            }

        };
        console.log($scope.invoice.datas)
        $scope.invoice.datas=[];
    };

//calculate the sum of all the items
    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.invoice.datas, function(data) {
            total += data.quantity * data.price;
        });

        return total;
    };
//calculate the total items in the cart
    $scope.totalitem=function () {
       return $scope.invoice.datas.length
    };
//add more items in the cart
    $scope.somemore=function (index,quantity,itemName,itemPrice,itemRemaining,imgSrc) {
            if(quantity<itemRemaining){
            $scope.invoice.datas.splice(index, 1, {
                itemName: itemName,
                price: itemPrice,
                quantity: quantity + 1,
                quantityRemaining: itemRemaining,
                imgSrc:imgSrc
            });}
            else{
                $scope.invoice.datas.splice(index, 1, {
                    itemName: itemName,
                    price: itemPrice,
                    quantity: quantity,
                    quantityRemaining: itemRemaining,
                    imgSrc:imgSrc
                });
                alert("No more left")
            }

    };
//remove one items in the cart
    $scope.someless=function (index,quantity,itemName,itemPrice,itemRemaining,imgSrc) {
        if(quantity>1){
        $scope.invoice.datas.splice(index, 1,{
            itemName: itemName,
            price: itemPrice,
            quantity: quantity-1,
            quantityRemaining: itemRemaining,
            imgSrc:imgSrc
        });}
        else{
            $scope.invoice.datas.splice(index, 1);

        }
    }



})
//custom directive
.directive('myItem', function() {
    return {
        restrict: 'E',
        templateUrl: 'my-item.html'
    };
})


.directive('myCart', function() {
    return {
        restrict: 'E',
        templateUrl: 'my-cart.html'
    };
});



