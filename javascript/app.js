let bagitemobjects;
let bagitems;
let bagitemobject;
onload();
function onload() {
    let bagitemsstr = localStorage.getItem('bagitems');
    bagitems = bagitemsstr ? JSON.parse(bagitemsstr) : [];
    displayitems();
    displaybagicon();
    displaybagitmes();
    loadbagitemobject();
}

function addtobag(itemId) {
    bagitems.push(itemId);
    localStorage.setItem('bagitems', JSON.stringify(bagitems));
    displaybagicon();
}

function displaybagicon() {
    let bagitemcount = document.querySelector('.bag-item-count');
    if (bagitems.length > 0) {
        bagitemcount.style.visibility = 'visible';
        bagitemcount.innerText = bagitems.length;
    }
    else {
        bagitemcount.style.visibility = 'hidden';
    }
}

function displayitems() {

    let itemcontainerelement = document.querySelector(".items");
    if (!itemcontainerelement) {
        return;
    }
    let innerHtml = '';
    itemdata.forEach(item => {
        innerHtml += `
    <div class="item">
        <img src=${item.item_img}
            alt="powerlook">
        <div class="item-rating">
            <p>${item.item_rating.ratings}⭐ | ${item.item_rating.counts}</p>
        </div>
        <div class="item-name">
            <p>${item.item_name}</p>
        </div>
        <div class="item-description">
            <p>${item.item_type}</p>
        </div>
        <div class="price-discount">
            <span class="price">Rs.${item.item_price}</span><span class="discount">(${item.item_discount}%OFF)</span>
        </div>
        <button class="add-to-bag" onclick="addtobag(${item.id})">Add to bag</button>
    </div>`
    });

    itemcontainerelement.innerHTML = innerHtml;
}



/*---------------------------------------------------------------------------------------*/

function loadbagitemobject() {
    console.log(bagitems);
    bagitemobject = bagitems.map(itemid => {
        for (let i = 0; i < itemdata.length; i++) {
            if (itemid == itemdata[i].id) {
                return itemdata[i];
            }
        }
    })
    console.log(bagitemobject);
}


function displaybagitmes() {
    let selecteditems=document.querySelector('.bag-main');
    let innerHTML="";
    bagitemobjects.forEach(bag=>{
        innerHTML+=generateitemhtml(bag);
    })
    selecteditems.innerHTML=innerHTML;

}

function generateitemhtml(bag) {
    ` 
    <div class="selected-item-portion">
        <div class="selected-item">
        <div class="selected-item-img">
            <img src="${bag.item_img}"
                alt="">
        </div>
        <div class="selected-item-details">
            <span class="selected-item-name">${bag.item_name}</span>
            <span class="selected-item-description">${bag.item_type}</span>
            <div class="selected-item-price-discount">
                <span class="selected-item-price">Rs${bag.item_price}</span>
                <span class="selected-item-discount">${bag.item_discount}</span>
            </div>
            <span class="selected-return-policy"> days return available</span>
            <span class="selected-delievry-description">Delivery by </span>
        </div>
        <span class="close-btn">X</span>
        </div>
    </div>`
}