$(function() {
    loadProducts();
    $("#products").on("click", ".btn-danger", handleDelete);
    $("#products").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addProduct);
    $("#updateSave").click(function () {
            var id = $("#updateId").val();
            var name = $("#updateName").val();
            var color = $("#updateColor").val();
            var price = $("#updatePrice").val();
            var department = $("#updateDepartment").val();
            var description = $("#updateDescription").val();
            $.ajax({
                url: "https://usman-recipes.herokuapp.com/api/products/" + id,
                data: { name, color, price, department, description },
                method: "PUT",
                success: function (response) {
                    console.log(response);
                    loadProducts();
                    $("#updateModal").modal("hide");
                }
            });
        })
})
function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".product");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/products/"+id, function(response) {
        $("#updateId").val(response._id);
        $("#updateName").val(response.name);
        $("#updateColor").val(response.color);
        $("#updatePrice").val(response.price);
        $("#updateDepartment").val(response.department);
        $("#updateDescription").val(response.description);
        $("#updateModal").modal("show");
    })
}
function addProduct() {
    var name = $("#name").val();
    var color = $("#color").val();
    var price = $("#price").val();
    var department = $("#department").val();
    var description = $("#description").val();
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "POST",
        data: {name, color, price, department, description},
        success: function(response) {
            console.log(response);
            $("#name").val("");
            $("#color").val("");
            $("#price").val("");
            $("#department").val("");
            $("#description").val("");
            loadProducts();
            $("#addModel").modal("hide");
        }
    });
}
function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".product");
    let id = parentDiv.attr("data-id");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/"+id,
        method: "Delete",
        success: function(){
            loadProducts();
        }
    })
    console.log(id);
    console.log("handle Delete");
}
function loadProducts() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET",
        error: function(){
            var products = $("#products");
            products.html("An Error has occured");
        },
        success: function(response) {
            console.log(response);
            var products = $("#products");
            products.empty();
            for(var i=0; i<response.length; i++){
                var pro = response[i];
                // products.append(
                //     "<div class="product"><h3>"+pro.name+"</h3><p>Color: "+pro.color+"</br>Price: "+pro.price+"</p></div>"
                // );
                products.append(
                    `<div class="product" data-id="${pro._id}">
                        <h3>
                            <button class="btn btn-danger btn-sm float-right">
                                Delete
                            </button>
                            <button class="btn btn-warning btn-sm float-right mr-2">
                                Edit
                            </button>
                            ${pro.name}
                        </h3>
                        <p>
                            Color: ${pro.color}</br>
                            Price: ${pro.price}</br>
                            Department: ${pro.department}</br>
                            Description: ${pro.description}
                        </p>
                    </div>`
                );
            }
        }
    });
}
  