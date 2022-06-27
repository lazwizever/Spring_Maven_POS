loadAllCustomers();

var customerArray = [];

var baseUrl = "http://localhost:8080/BackEnd_war/customer";


function saveCustomer() {
    var data = $("#customerForm").serialize();
    $.ajax({
        url: baseUrl,
        method: "POST",
        data: data,
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Customer Registered");
                loadAllCustomers();
            }
        },

            error: function (ob) {
                alert(ob.responseJSON.message);
            }
    });

}

function loadAllCustomers() {
    $("#customerTable").empty();
    $.ajax({
        url: baseUrl,
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.cusId}</td><td>${customer.cusName}</td><td>${customer.cusAddress}</td><td>${customer.city}</td><td>${customer.province}</td><td>${customer.postalCode}</td></tr>`;
                $("#customerTable").append(row);
                bindClickEvents();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

function clearCustomerTextFields() {
    $("#inputnewId").val("");
    $("#custName").val("");
    $("#custAddress").val("");
    $("#province").val("");
    $("#inputCity").val("");
    $("#postalCode").val("");
    /*$("#cusForm input").css('border','silver 1px solid');*/

}

function bindClickEvents() {
    $("#customerTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let city = $(this).children().eq(3).text();
        let province = $(this).children().eq(4).text();
        let postalCode = $(this).children().eq(5).text();
        console.log(province);


        $("#inputnewId").val(id);
        $("#custName").val(name);
        $("#custAddress").val(address);
        $("#inputCity").val(city);
        $("#province").val(province);
        $("#postalCode").val(postalCode);
    });
}

function updateCustomer() {
    var customerOb = {
        cusId: $("#inputnewId").val(),
        cusName: $("#custName").val(),
        cusAddress: $("#custAddress").val(),
        city: $("#inputCity").val(),
        province: $("#province").val(),
        postalCode: $("#postalCode").val()
    }

    $.ajax({
        url: baseUrl,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(customerOb),
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Updated");
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function deleteCustomer(){
    let cusId = $("#inputnewId").val();
    console.log(cusId);
    $.ajax({
        url: baseUrl + "?id=" + cusId,
        method: "DELETE",

        success: function (res) {
            if (res.code == 200) {
                alert("Customer Successfully Deleted");
                loadAllCustomers();
               // clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function searchCustomer(){
    let cusId = $("#txtSearchCustomer").val();

    $.ajax({
        url: baseUrl + "/" + cusId,
        method: "GET",
        success: function (response) {
            $("#inputnewId").val(response.data.cusId);
            $("#custName").val(response.data.cusName);
            $("#custAddress").val(response.data.cusAddress);
            $("#inputCity").val(response.data.city);
            $("#province").val(response.data.province);
            $("#postalCode").val(response.data.postalCode);
        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
}



/*-----------Validations--------------*/

var regExCusName = /^([A-z\s]{3,20})$/;
var regExCusAddress = /^([A-z0-9/,\s]{3,})$/;
var regExCity = /^([A-z]{3,20})$/;
var regExPostalCode = /^([0-9]{3,5})$/;


function validateCustomerName(){
    console.log("validate customer name");
    let input = $("#custName").val();

    if (regExCusName.test(input)) {
        $("#error1").text("");
        $("#custName").css('border', '2px solid green');

        $("#custName").keydown(function (e){
            if (e.key == 'Enter'){
                $("#custAddress").focus();
            }
        });
        return true;
    } else {
        $("#custName").css('border', '2px solid red');
        $("#error1").text("Wrong format : "+input);
        return false;
    }
}

$("#custName").keyup(function () {
disableCusRegisterBtn();
});

$("#inputnewId").keyup(function () {
    disableCusRegisterBtn();
});



function validateCusAddress(){
    let input = $("#custAddress").val();

    if (regExCusAddress.test(input)) {
        $("#error2").text("");
        $("#custAddress").css('border', '2px solid green');

        $("#custAddress").keydown(function (e){
            if (e.key == 'Enter'){
                $("#inputCity").focus();
            }
        });
        return true;
    } else {
        $("#custAddress").css('border', '2px solid red');
        $("#error2").text("Wrong format : "+input);
        return false;
    }
}

$("#custAddress").keyup(function () {
    disableCusRegisterBtn();
});


function validateCustomerCity(){

    let input = $("#inputCity").val();

    if (regExCity.test(input)) {
        $("#error3").text("");
        $("#inputCity").css('border', '2px solid green');

        $("#inputCity").keydown(function (e){
            if (e.key == 'Enter'){
                $("#postalCode").focus();
            }
        });
        return true;
    } else {
        $("#inputCity").css('border', '2px solid red');
        $("#error3").text("Wrong format : "+input);
        return false;
    }
}

$("#inputCity").keyup(function () {
    disableCusRegisterBtn();
});


function validateCustomerPostalCode(){
    let input = $("#postalCode").val();

    if (regExPostalCode.test(input)) {
        $("#error4").text("");
        $("#postalCode").css('border', '2px solid green');

        return true;
    } else {
        $("#postalCode").css('border', '2px solid red');
        $("#error4").text("Wrong format : "+input);
        return false;
    }
}

$("#postalCode").keyup(function () {
    disableCusRegisterBtn();
});


function disableCusRegisterBtn(){
    if (validateAll()){
        $("#btnCustomerRegister").attr('disabled', false);
    }else {
        $("#btnCustomerRegister").attr('disabled', true);
    }
}

function isCustomerIdExist(){
    for (const customer of customerArray) {

        if ($("#inputnewId").val() === customer.id){
            return false;
        }
    }
    return true;
}

function validateAll(){
        if (validateCustomerName()){
            if (validateCusAddress()){
                if (validateCustomerCity()){
                    if (validateCustomerPostalCode()){
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


$("#btnUpdateCustomer").click(function () {
  updateCustomer();
});

$("#btnSearchCustomer").click(function (){
searchCustomer();
});

$("#btnCustomerRegister").click(function (){
    saveCustomer();

});

$("#btnClearCustomerFields").click(function (){
    clearCustomerTextFields();
});
$("#btnCustomerDelete").click(function () {
    deleteCustomer();
});