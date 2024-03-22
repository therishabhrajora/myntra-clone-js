const convenience_fee=99;

let bagitemobjects;
let bagitems;
let bagitemobject;
onload();
function onload() {
    let bagitemsstr = localStorage.getItem('bagitems');
    bagitems = bagitemsstr ? JSON.parse(bagitemsstr) : [];
    displayitems();
    displaybagicon();
    loadbagitemobject();
    displaybagitmes();
    displaypricesummery();
}

function addtobag(itemId) {
    bagitems.push(itemId);
    localStorage.setItem('bagitems', JSON.stringify(bagitems));
    displaybagicon();
}

function displaybagicon() {
    let bagitemcount = document.querySelector('.bag-item-count');
    console.log(bagitemcount);
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
    let selecteditems = document.querySelector('.selected-item-portion');
    console.log(selecteditems);
    let innerHtml = "";
    bagitemobject.forEach(bag => {
        innerHtml += generateitemhtml(bag);
    })
    selecteditems.innerHTML = innerHtml;

}


function removefrombag(itemid) {
    bagitems = bagitems.filter(bagitemId => bagitemId != itemid);
    localStorage.setItem('bagitems', JSON.stringify(bagitems));
    loadbagitemobject();
    displaybagicon();
    displaybagitmes();
    displaypricesummery();
   
}

function displaypricesummery(){
    let pricedetail=document.querySelector(".price-details-portion");
    let totalitem=bagitemobject.length;
    let totalMRP=0;
    let totalDiscount=0;

    bagitemobject.forEach(bagitem=>{
        totalMRP+=bagitem.original_MRP;
        totalDiscount+=bagitem.original_MRP-bagitem.item_price;
    })

    let totalpayment=totalMRP-totalDiscount+convenience_fee;
    console.log(totalpayment);
    

    pricedetail.innerHTML=`
    <span class="price-detail-heading"> PRICE DETAILS (<span>${totalitem} items</span>)</span>
                <table>
                    <tr>
                        <td>Total MRP</td>
                        <td>Rs${totalMRP}</td>
                    </tr>
                    <tr>
                        <td>Discount on MRP</td>
                        <td>Rs-${totalDiscount}</td>
                    </tr>
                    
                    <tr>
                        <td>Coveniance Fee</td>
                        <td>Rs${convenience_fee}</td>
                    </tr>
                    <tr>
                        <td>Total Amount</td>
                        <td>Rs${totalpayment}</td>
                    </tr>
                </table>
                <div class="place-order">
                    <span>Place Order</span>
                </div>`;
            
}



function generateitemhtml(bag) {
    return `<div class="selected-item-portion">
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
                <span class="selected-item-discount">(${bag.item_discount}%off)</span>
            </div>
            <span class="selected-original-price">Rs${bag.original_MRP}</span>
            <span class="selected-return-policy"><b>14 days </b>days return available</span>
            <span class="selected-delievry-description"> Delivery by 30.03.2024</span>
        </div>
        <div class="close-btn" onclick="removefrombag(${bag.id})">X</div>
        </div>
    </div>`
}
