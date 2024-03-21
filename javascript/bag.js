let bagitemobjects;
onload();

function onload() {
    displaybagitmes();
}

function displaybagitmes() {
    console.log(bagitems);

    let selecteditems = document.querySelector('.selected-item-container');
    if (!selecteditems) {
        return;
    }
    selecteditems.innerHTML =
    ` 
    <div class="selected-item-portion">
        <div class="selected-item">
        <div class="selected-item-img">
            <img src="{bag.item_img}"
                alt="">
        </div>
        <div class="selected-item-details">
            <span class="selected-item-name">{bag.item_name}</span>
            <span class="selected-item-description">{bag.item_type}</span>
            <div class="selected-item-price-discount">
                <span class="selected-item-price">Rs{bag.item_price}</span>
                <span class="selected-item-discount">{bag.item_discount}</span>
            </div>
            <span class="selected-return-policy"> days return available</span>
            <span class="selected-delievry-description">Delivery by </span>
        </div>
        <span class="close-btn">X</span>
        </div>
    </div>`
}
 
function generateitemhtml() {

}


