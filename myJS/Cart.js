const btn = document.querySelectorAll("button")
var cartItemsCount = 0;
var totalPrice = 0;

btn.forEach(function(button,index){
    button.addEventListener("click",function(event){{
        var btnItem = event.target
        var product = btnItem.parentElement
        var productImg = product.querySelector("Img").src //.src chỉ vào mỗi ảnh
        var productName = product.querySelector("h6").innerText //innerText chỉ vào text
        var productPrice = product.querySelector("P").innerText
        addcart(productImg,productName,productPrice)
    }})
})
function addcart(productImg, productName, productPrice) {

    // Tính tổng giá tiền
    var numericPrice = parseFloat(productPrice.replace(' VNĐ', '').replace(/\./g, '').replace(',', '.')); // Chuyển đổi giá tiền sang số
    totalPrice += numericPrice;
    
    // Cập nhật tổng tiền trong giỏ hàng
    var totalPriceElement = document.getElementById("total-price");
    totalPriceElement.innerText = "Tổng: " + totalPrice.toLocaleString('vi-VN') + " VNĐ"; // Hiển thị tổng tiền có định dạng

    var addtr = document.createElement("tr");
    var trcontent = '<td><img style="width: 50px; display: inline; margin-bottom: 10px " src="'+productImg+
    '"></td><td><p style="display: inline; margin-left: -30px">'+productPrice+
    '</p></td><td><input style="width: 40px; outline: none; margin-left: 35px; margin-right: 30px;" type="number" value="1" min="1"></td><td><button class="remove-btn">Xóa</button></td>';
    addtr.innerHTML = trcontent;
    var cardTable = document.querySelector("#sidebar");
    cardTable.append(addtr);

    // thêm sự kiện nghe cho thẻ input mới tạo
    var inputs = cardTable.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.addEventListener("input", updateTotalPrice);
    });

    updateTotalPrice(); // Cập nhật tổng tiền sau khi thêm sản phẩm

}
document.querySelector("#sidebar").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        event.target.closest("tr").remove(); 
    }
});

document.querySelector("#sidebar").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        var removedItem = event.target.closest("tr");
        var removedPrice = parseFloat(removedItem.querySelector("p").innerText.replace(' VNĐ', '').replace(/\./g, '').replace(',', '.'));
        totalPrice -= removedPrice;

        removedItem.remove();

        var totalPriceElement = document.getElementById("total-price");
        totalPriceElement.innerText = "Tổng: " + totalPrice.toLocaleString('vi-VN') + " VNĐ";
    }
});

function updateTotalPrice() {
    var totalPrice = 0;
    var items = document.querySelectorAll("#sidebar tr");

    items.forEach(function(item) {
        var productPrice = parseFloat(item.querySelector("p").innerText.replace(' VNĐ', '').replace(/\./g, '').replace(',', '.'));
        var quantity = parseInt(item.querySelector("input").value);
        totalPrice += productPrice * quantity;
    });

    var totalPriceElement = document.getElementById("total-price");
    totalPriceElement.innerText = "Tổng: " + totalPrice.toLocaleString('vi-VN') + " VNĐ";
}





