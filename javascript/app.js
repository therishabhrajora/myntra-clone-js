
onload();
function onload() {
    let bagitemsstr = localStorage.getItem('bagitems');
    bagitems = bagitemsstr ? JSON.parse(bagitemsstr) : [];
    displayitems();
    displaybagicon();
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

    const items = document.querySelector(".items");
    console.log(items);
    if(!items){
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

    items.innerHTML = innerHtml;
}
