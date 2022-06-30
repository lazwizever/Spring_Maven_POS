loadAllCustomerIds();
loadAllItemIds();

var itemDetailsArray = [];


var baseUrl2 = "http://localhost:8080/BackEnd_war/placeOrder";

function loadAllItemIds(){
    $.ajax({
        url: baseUrl2 + "/itemId",
        method: "GET",
        success: function (response) {
            $("#cmbItemIds").empty();

            for (const id of response.data) {
                $("#cmbItemIds").append(new Option(id));
            }
        },
        error:function (ob){
            console.log(ob);
            alert(ob.responseJSON.message);
        }
    });



}


function loadAllCustomerIds(){

    $.ajax({
        url: baseUrl2 + "/ids",
        method: "GET",
        success: function (response) {
            $("#customerId").empty();
            for (const id of response.data) {
                let option = `<option value="${id}">${id}</option>`;
                $("#customerId").append(option);
            }
        },
        error:function (ob){
            console.log(ob);
            alert(ob.responseJSON.message);
        }
    });
}

function clearPlaceOrderFields(){
    clearItemsFieldsPlaceOrder();

    $("#customerName").val("");
    $("#customerId1").val("");
    $("#oDate").val("");

    $("#grossAmount").val("");
    $("#netAmount").val("");
    $("#cash").val("");
    $("#balanceLabel").val("");
    $("#orderDiscount").val("");

}

function placeOrder(){
var ordersDetailsArray = [];

    for (let i = 0; i < itemDetailsArray.length; i++) {
        var itemDetails = {
            orderId :itemDetailsArray[i].getOrderId(),
            itemCode:itemDetailsArray[i].getOrderItemCode(),
            orderQty:itemDetailsArray[i].getOrderCustomerQTY(),
            total:itemDetailsArray[i].getItemTotal()
        }
        ordersDetailsArray.push(itemDetails);

    }

    var order={
        orderId:$("#orderId").val(),
        cusId:$("#customerId1").val(),
        orderDate:$("#oDate").val(),
        total:$("#netAmount").val(),
        itemList:ordersDetailsArray
    }

    $.ajax({
        url:baseUrl2,
        method:"POST",
        contentType:"application/json",
        data: JSON.stringify(order),
        success:function (response) {
            if (response.code == 200){
                    alert(response.message);
                    loadAllItems();
            }
        },
        error:function (ob){
            console.log(ob);
            alert(ob.responseJSON.message);
        }
    });

}

$("#customerId").on("change",function(){

        let cusId = $(this).find('option:selected').text();

        $.ajax({
            url: baseUrl2 + "/" + cusId,
            method: "GET",
            success: function (response) {

                $("#customerId1").val(cusId);
                $("#customerName").val(response.data.cusName);
            },
            error: function (ob, statusText, error) {
                alert("No Such Customer");
                loadAllCustomers();
            }
        });
    });

$("#cmbItemIds").on("change",function(){

    let itemId = $(this).find('option:selected').text();

    $.ajax({
        url: baseUrl2 + "?id=" + itemId,
        method: "GET",
        success: function (response) {
            $("#itemId").val(itemId);
            $("#description").val(response.data.description);
            $("#unitPrices").val(response.data.unitPrice);
            $("#qTY").val(response.data.inputQTY);

        },
        error:function (ob){
            console.log(ob);
            alert(ob.responseJSON.message);
        }
    });
});

function searchOrder() {
    let id = $("#txtSearchOrder").val();

    $.ajax({
        url: baseUrl2 + "?orderId=" + id,
        method: "GET",
        success: function (resp) {
            $("#oDate").val(resp.data.orderDate);
            $("#netAmount").val(resp.data.netTotal);
            $("#grossAmount").val(resp.data.total);
            $("#customerId").val(resp.data.cusId);
            $("#customerId").trigger("change");


            let itemArray = resp.data.itemList;
            console.log(itemArray);
            for (let i = 0; i < itemArray.length; i++) {
                $.ajax({
                    url: baseUrl2 + "?id=" + itemArray[i].itemCode,
                    method: "GET",
                    success: function (response) {
                       /* $("#itemId").val(orderItem.itemCode);
                        $("#description").val(response.data.description);
                        $("#unitPrices").val(response.data.unitPrice);
                        $("#qTY").val(response.data.inputQTY);*/

                        let item = response.data;

                        let total = item.unitPrice * itemArray[i].orderQty;
                       itemDetailsArray[i] =  new ItemDetails(itemArray[i].itemCode,itemArray[i].orderId,item.description,itemArray[i].orderQty,total);



                    },
                    error:function (ob){
                        console.log(ob);
                        alert(ob.responseJSON.message);
                    }
                });
            }

            loadTable();
        },
        error: function (ob, statusText, error) {
            alert("There is no Order with this Id");
        }
    });
}


function clearItemsFieldsPlaceOrder(){
    $("#description").val("");
    $("#custQTY").val("");
    $("#qTY").val("");
    $("#unitPrices").val("");
    $("#discount").val("");
    $("#itemId").val("");
}

function setGrossAmount(){
    var grossTotal = 0;
    let itemId = $("#itemId").val();

    for (let i = 0; i < itemDetailsArray.length; i++) {

        grossTotal = parseInt(grossTotal) + parseInt(itemDetailsArray[i].getItemTotal());
        $("#grossAmount").val(grossTotal);
    }
}

function addToCart(){
    let itemId = $("#itemId").val();
    let orderId = $("#orderId").val();
    let description = $("#description").val();
    let cusQTY = $("#custQTY").val();
    let unitPrices = $("#unitPrices").val();
    let total = (cusQTY) * (unitPrices);


    for (let i = 0; i < itemDetailsArray.length; i++) {
        if (itemId === itemDetailsArray[i].getOrderItemCode()){

            var newCusQTY = 0;

            if ($("#addToCart").text() === "Update"){
                newCusQTY = cusQTY;
            }else {
                newCusQTY = parseInt(itemDetailsArray[i].getOrderCustomerQTY())  + parseInt(cusQTY);

                if(newCusQTY > itemArray[i].getQtyOnHand()){
                    $("#custQTY").css('border', '2px solid red');
                    $("#error002").text("Exceed the QTY On Hand");
                    return;
                }
            }


            var newTotal = (newCusQTY) * (unitPrices);

            itemDetailsArray[i].setOrderCustomerQTY(newCusQTY);
            itemDetailsArray[i].setItemTotal(newTotal);
            clearItemsFieldsPlaceOrder();
            loadTable();
            setGrossAmount();
            setNetAmount();
            return;
        }

    }
    var itemDetails = new ItemDetails(itemId,orderId,description,cusQTY,unitPrices,total);
    itemDetailsArray.push(itemDetails);
    clearItemsFieldsPlaceOrder();
    loadTable();
    setGrossAmount();
    setNetAmount();
    $("#btnPlaceOrder").attr('disabled',true);
}

function loadTable(){
    $("#placeOrderTable>tr").empty();

    for (let i of itemDetailsArray) {
        let row = `<tr><td>${i.getOrderItemCode()}</td><td>${i.getOrderItemDescription()}</td><td>${i.getOrderCustomerQTY()}</td><td>${i.getOrderUnitPrice()}</td><td>${i.getItemTotal()}</td></tr>`;
        $("#placeOrderTable").append(row);
    }
}

function setNetAmount(){
    let discount = parseInt($("#orderDiscount").val());
    let grossAmount = parseInt($("#grossAmount").val());

    if (isNaN(discount)){
        $("#netAmount").val(grossAmount);
    }else {
        $("#netAmount").val(grossAmount - discount);
    }


}

function validateAll(){
    let netAmount = $("#netAmount").val();
    let cash = $("#cash").val();

    let net = parseInt(netAmount);
    let cash1 = parseInt(cash);

    if ($("#orderId").val()!=""){
        if ($("#customerId1").val()!=""){
            if (itemDetailsArray.length!=0){
                if ($("#cash").val()!="" && cash1>=net){
                    return true;
                }else {
                    return false;
                }
            }else {
                return false;
            }
        }else {
            return false;
        }
    }else {
        return false;
    }
}

function enableDisablePlaceOrderBtn(){
    if (validateAll()){
        $("#btnPlaceOrder").attr("disabled",false);
    }else {
        $("#btnPlaceOrder").attr("disabled",true);
    }


}



$("#btnPlaceOrder").click(function (){
placeOrder();

});

$("#btnSearchOrder").click(function (){
    itemDetailsArray = [];
searchOrder();
});


$("#addToCart").click(function (){
addToCart();
});



/*-------------Set netAmount----------------*/

$("#orderDiscount").keyup(function (){

    setNetAmount();

    let cash = $("#cash").val();
    let netAmount = $("#netAmount").val();

    if (cash!==""){
        let balance = (cash) - (netAmount);
        $("#balanceLabel").val(balance);

    }

});

/*--------------Set balance----------------*/

$("#cash").keyup(function (){

    let cash = parseInt($("#cash").val());
    let netAmount = $("#netAmount").val();

    $("#balanceLabel").val(cash - netAmount);


    let discount = $("#orderDiscount").val();
    let grossAmount = parseInt($("#grossAmount").val());

    if (discount==""){
        $("#balanceLabel").val(cash - grossAmount);
    }
enableDisablePlaceOrderBtn();
});



/*---PlaceOrder Form-----*/

var regExDiscounts = /^([0-9.]{1,})$/;
var regExCustomerQty = /^([0-9]{1,10})$/;


$("#custQTY").keyup(function (){

    let input = parseInt($("#custQTY").val());
    let qty =    parseInt($("#qTY").val());



    if (regExCustomerQty.test(input)) {
        if (qty >= input){
            $("#error002").text("");
            $("#custQTY").css('border', '2px solid green');
            return true;

        }else {
            $("#custQTY").css('border', '2px solid red');
            $("#error002").text("Exceed the QTY On Hand");
            return false;
        }
    } else {
            $("#custQTY").css('border', '2px solid red');
            $("#error002").text("Wrong format : "+input);
            return false;
    }
});


$("#placeOrderTable").css('overflow-y','hidden');






/*-----------------------------------------------------------------------------------------------------*/

function ItemDetails(itemCode,orderId,description,customerQTY,unitPrice,total) {
    this.__itemCode = itemCode;
    this.__orderId = orderId;
    this.__description = description;
    this.__customerQTY = customerQTY;
    this.__unitPrice = unitPrice;
    this.__total = total;


    this.getOrderItemCode = function () {
        return this.__itemCode;
    }

    this.setItemCode = function (id) {
        this.__itemCode = id;
    }


    this.getOrderId = function () {
        return this.__orderId;
    }

    this.setOrderId = function (oId) {
        this.__orderId = oId;
    }

    this.getOrderItemDescription = function () {
        return this.__description;
    }

    this.setOrderItemDescription = function (description) {
        this.__description = description;
    }

    this.getOrderCustomerQTY = function () {
        return this.__customerQTY;
    }

    this.setOrderCustomerQTY = function (qty) {
        this.__customerQTY = qty;
    }

    this.getOrderUnitPrice = function () {
        return this.__unitPrice;
    }

    this.setOrderUnitPrice = function (unitPrice) {
        this.__unitPrice = unitPrice;
    }

    this.getItemTotal = function () {
        return this.__total;
    }

    this.setItemTotal = function (total) {
        this.__total = total;
    }

}





