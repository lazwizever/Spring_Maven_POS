loadAllItems();

var itemArray = [];

var baseUrl1 = "http://localhost:8080/BackEnd_war/item";

function saveItem(){
    var data = $("#itemForm").serialize();
    console.log(data);
    $.ajax({
        url: baseUrl1,
        method: "POST",
        data: data,
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Item Registered");
                loadAllItems();
            }
        },

        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });


}

function loadAllItems(){
    $("#itemTable").empty();
    $.ajax({
        url: baseUrl1,
        method: "GET",
        success: function (resp) {
            itemArray = resp.data;
            for (const item of resp.data) {
                let row = `<tr><td>${item.itemId}</td><td>${item.description}</td><td>${item.packSize}</td><td>${item.unitPrice}</td><td>${item.inputQTY}</td></tr>`;
                $("#itemTable").append(row);
                bindClickEventsForItems();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function bindClickEventsForItems() {
    $("#itemTable>tr").click(function () {

        let itemId = $(this).children().eq(0).text();
        let descriptions = $(this).children().eq(1).text();
        let packSize = $(this).children().eq(2).text();
        let unitPrice = $(this).children().eq(3).text();
        let qyOnHand = $(this).children().eq(4).text();

        $("#itemCode").val(itemId);
        $("#inputDescription").val(descriptions);
        $("#packSize").val(packSize);
        $("#unitPrice").val(unitPrice);
        $("#inputQTy").val(qyOnHand);

    });
}

function clearItemTextFields(){
    $("#itemCode").val("");
    $("#inputDescription").val("");
    $("#packSize").val("");
    $("#unitPrice").val("");
    $("#inputQTy").val("");
    $("#inputDiscount").val("");
}

function deleteItem(){
    let itemId = $("#itemCode").val();
    console.log(itemId);
    $.ajax({
        url: baseUrl1 + "?id=" + itemId,
        method: "DELETE",

        success: function (res) {
            if (res.code == 200) {
                alert("Item Successfully Deleted");
                loadAllItems();
                // clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function updateItem(){
    var itemOb = {
        itemId: $("#itemCode").val(),
        description: $("#inputDescription").val(),
        packSize: $("#packSize").val(),
        unitPrice: $("#unitPrice").val(),
        inputQTY: $("#inputQTy").val(),
    }

    $.ajax({
        url: baseUrl1,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Updated");
                loadAllItems();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

function searchItem(){
    let itemId = $("#txtItemSearch").val();
    console.log(itemId);
    $.ajax({
        url: baseUrl1 + "/" + itemId,
        method: "GET",
        success: function (response) {
            $("#itemCode").val(response.data.itemId);
            $("#inputDescription").val(response.data.description);
            $("#packSize").val(response.data.packSize);
            $("#unitPrice").val(response.data.unitPrice);
            $("#inputQTy").val(response.data.inputQTY);

        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
}

function disableItemRegisterBtn(){
    if (validateAllItem()){
        $("#btnItemRegister").attr('disabled', false);
    }else {
        $("#btnItemRegister").attr('disabled', true);
    }
}

function validateItemDescription(){
    let input = $("#inputDescription").val();

    if (regExDescription.test(input)) {
        $("#error01").text("");
        $("#inputDescription").css('border', '2px solid green');

        $("#inputDescription").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#packSize").focus();
            }
        });
        return true;
    } else {
        $("#inputDescription").css('border', '2px solid red');
        $("#error01").text("Wrong format : " + input);
        return false;
    }
}

$("#inputDescription").keyup(function (e) {
disableItemRegisterBtn();
});

$("#itemCode").keyup(function (e) {
    disableItemRegisterBtn();
});


function validatePackSize(){
    let input = $("#packSize").val();

    if (regExPackSize.test(input)) {
        $("#error02").text("");
        $("#packSize").css('border', '2px solid green');

        $("#packSize").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#unitPrice").focus();
            }
        });
        return true;
    } else {
        $("#packSize").css('border', '2px solid red');
        $("#error02").text("Wrong format : " + input);
        return false;
    }
}

$("#packSize").keyup(function (e) {
disableItemRegisterBtn();
});

function validateUnitPrice(){
    let input = $("#unitPrice").val();

    if (regExUnitPrice.test(input)) {
        $("#error03").text("");
        $("#unitPrice").css('border', '2px solid green');

        $("#unitPrice").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#inputQTy").focus();
            }
        });
        return true;
    } else {
        $("#unitPrice").css('border', '2px solid red');
        $("#error03").text("Wrong format : " + input);
        return false;
    }
}

$("#unitPrice").keyup(function (e) {
disableItemRegisterBtn();
});


function validateQTY(){
    let input = $("#inputQTy").val();

    if (regExQty.test(input)) {
        $("#error04").text("");
        $("#inputQTy").css('border', '2px solid green');

        $("#inputQTy").keydown(function (e) {
            if (e.key == 'Enter') {
                $("#inputDiscount").focus();
            }
        });
        return true;
    } else {
        $("#inputQTy").css('border', '2px solid red');
        $("#error04").text("Wrong format : " + input);
        return  false;
    }
}

$("#inputQTy").keyup(function (e) {
disableItemRegisterBtn();
});


function isItemIdExists(){
    for (const item of itemArray) {
        if ($("#itemCode").val() == item.id) {
            return false;
        }
    }
        return true;
}

function validateAllItem(){


        if (validateItemDescription()){
            if (validatePackSize()){
                if (validateUnitPrice()){
                    if (validateQTY()){
                        if (isItemIdExists()){
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
        }else {
            return false;
        }

}

$("#btnItemRegister").click(function (){
    saveItem();

});

$("#btnItemDelete").click(function (){
    deleteItem();
});

$("#btnItemUpdate").click(function (){
    updateItem();
});

$("#btnItemSearch").click(function (){
    searchItem();

});

$("#btnClearItemFields").click(function (){
    clearItemTextFields();
});

/*------Validations--------*/

var regExItemCode = /^(I-)[0-9]{3,5}$/;
var regExDescription = /^([A-z0-9/,\s]{3,})$/;
var regExPackSize = /^([0-9]{1,10})$/;
var regExUnitPrice = /^([0-9.]{1,})$/;
var regExQty = /^([0-9]{1,10})$/;
var regExDiscount = /^([0-9.]{1,})$/;




