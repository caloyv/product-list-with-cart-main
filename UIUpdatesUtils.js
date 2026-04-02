import * as Utils from "./Utils.js";
import * as UIUpdates from "./UIUpdatesUtils.js";
import { SCREEN_WIDTH, TOTAL_ORDER } from "./state.js";


export function showItem(data, id) {
    const itemContainerDiv = Utils.createDiv("item-container");
    const itemImgContainerDiv = Utils.createDiv("item-img-container");
    const addToCartContainer = Utils.createDiv("add-to-cart-container", ["data-id", id]);
    
    const detailsContainerDiv = Utils.createDiv("details-container");

    let imgElement = updateImages(data)
    

    const categoryText = Utils.createParagraph(data.category, "category");
    const itemNameText = Utils.createParagraph(data.name, "item-name");
    const priceText = Utils.createParagraph(`$${data.price.toFixed(2)}`, "price");

    if (TOTAL_ORDER[id] > 0) {
        activeCart(addToCartContainer, TOTAL_ORDER[id], id);
    } else {
        disableCart(addToCartContainer)
    }


    document.querySelector(".items-container").appendChild(itemContainerDiv);
    itemContainerDiv.appendChild(itemImgContainerDiv);
    itemContainerDiv.appendChild(detailsContainerDiv);
    itemImgContainerDiv.appendChild(addToCartContainer);
    if (imgElement instanceof Node) 
        itemImgContainerDiv.appendChild(imgElement);


    detailsContainerDiv.appendChild(categoryText);
    detailsContainerDiv.appendChild(itemNameText);
    detailsContainerDiv.appendChild(priceText);
}

export function activeCart(cartBtn, quantity, dataId) {
    console.log("Active Cart")
    const minusIconContainer = Utils.createDiv("minus-icon-container");
    const plusIconContainer = Utils.createDiv("plus-icon-container");
    const minusIcon = Utils.createImg("assets/images/icon-decrement-quantity.svg", "minus icon");
    const plusIcon = Utils.createImg("assets/images/icon-increment-quantity.svg", "plus icon");

    minusIconContainer.appendChild(minusIcon);
    plusIconContainer.appendChild(plusIcon);

    cartBtn.classList.add("active-cart");
    
    const itemContainer = document.querySelectorAll('.item-image')

    itemContainer.forEach((item, index) => {
        if (index == dataId) {
            item.classList.add('active')
        }
    })

    cartBtn.replaceChildren();
    cartBtn.appendChild(minusIconContainer);
    cartBtn.appendChild(Utils.createParagraph(`${quantity}`, "quantity"));
    cartBtn.appendChild(plusIconContainer);
}

export async function updateTotalCartUI(data, TOTAL_ORDER) {
    const totalCart = TOTAL_ORDER.reduce((acc, curr) => acc + curr, 0);

    const totalCartText = document.querySelector("#total-cart");
    totalCartText.textContent = totalCart;

    const cartEmptyContainer = document.querySelector(".cart-empty-container");
    let totalAmountOrder = 0;
    let totalOrder = 0;
    if (totalCart > 0) {
        const addedItemsListContainerDiv = Utils.createDiv("added-items-list-container");

        TOTAL_ORDER.forEach((order, index) => {
            if (order > 0) {
                totalOrder = data[index].price * order;

                totalAmountOrder = totalAmountOrder + totalOrder;

                const addedItemsListDiv = Utils.createDiv("added-items-list");
                const itemsDetailsContainerDiv = Utils.createDiv("items-details-container");
                const itemName = Utils.createParagraph(data[index].name, "item-name");
                const totalItemsContainerDiv = Utils.createDiv("total-items-container");
                const itemQuantity = Utils.createParagraph(`${order}x`, "item-quantity");
                const individualAmount = Utils.createParagraph(`@ $${data[index].price.toFixed(2)}`, "individual-amount");
                const totalAmount = Utils.createParagraph(`$${(data[index].price * order).toFixed(2)}`, "total-amount");

                const removeItemIconContainer = Utils.createDiv("remove-item-icon-container", ["data-id", index]);
                const removeItemIcon = Utils.createImg("assets/images/icon-remove-item.svg", "remove icon");

                const orderTotalContainer = Utils.createDiv("order-total-container");
                const orderTotalText = Utils.createParagraph("Order Total", "order-total-text");
                const orderTotal = Utils.createParagraph(`$${Utils.formatPrice(totalAmountOrder)}`, "order-total");

                totalItemsContainerDiv.appendChild(itemQuantity);
                totalItemsContainerDiv.appendChild(individualAmount);
                totalItemsContainerDiv.appendChild(totalAmount);

                removeItemIconContainer.appendChild(removeItemIcon);

                itemsDetailsContainerDiv.appendChild(itemName);
                itemsDetailsContainerDiv.appendChild(totalItemsContainerDiv);

                addedItemsListDiv.appendChild(itemsDetailsContainerDiv);
                addedItemsListDiv.appendChild(removeItemIconContainer);

                addedItemsListContainerDiv.appendChild(addedItemsListDiv);
                orderTotalContainer.appendChild(orderTotalText);
                orderTotalContainer.appendChild(orderTotal);

                const deliverTypeContainer = Utils.createDiv("delivery-type-container");
                const treeIconContainer = Utils.createDiv("tree-icon-container");
                const treeIconImg = Utils.createImg("assets/images/icon-carbon-neutral.svg", "tree icon");
                const treeParagraph = Utils.createParagraph("This is a ");
                const treeSpan = Utils.createSpan("carbon-neutral", "carbon-neutral");
                treeParagraph.appendChild(treeSpan);
                treeParagraph.append(" delivery");

                treeIconContainer.appendChild(treeIconImg);
                deliverTypeContainer.appendChild(treeIconContainer);
                deliverTypeContainer.appendChild(treeParagraph);

                const confirmBtn = Utils.createBtn("Confirm Order", "confirm-btn");



                cartEmptyContainer.replaceChildren(
                    addedItemsListContainerDiv,
                    orderTotalContainer,
                    deliverTypeContainer,
                    confirmBtn
                );
            }
        });
    } else {
        const emptyCardImgContainerDiv = Utils.createDiv("empty-card-img-container");
        const emptyCardImg = Utils.createImg("./assets/images/illustration-empty-cart.svg", "cake image");
        const paragraphForEmptyCard = "Your added items will appear here";
        emptyCardImgContainerDiv.appendChild(emptyCardImg);

        cartEmptyContainer.replaceChildren(emptyCardImgContainerDiv, Utils.createParagraph(paragraphForEmptyCard));
    }
}

export function disableCart(cartIconContainerDiv, dataId) {
    const cartIconImg = Utils.createImg("./assets/images/icon-add-to-cart.svg", "cart icon","cart-icon");
    const addToCartText = Utils.createParagraph("Add to Cart", "add-to-card-text");
    const cartIconContainer = Utils.createDiv("cart-icon-container");

    cartIconContainer.appendChild(cartIconImg);


    if (dataId) {
        const itemContainer = document.querySelectorAll('.item-image')

        itemContainer.forEach((item, index) => {
            if (index == dataId) {
                item.classList.remove('active')
            }
        })
    }


    cartIconContainerDiv.classList.remove("active-cart");
    cartIconContainerDiv.replaceChildren(
        cartIconContainer,
        addToCartText
    );
}

export function updateImages(data) {
    let imgElement;

    switch(true) {
        case SCREEN_WIDTH > 1440:
            imgElement = Utils.createImg(data.image.desktop, data.name, 'item-image');
            break;
        case SCREEN_WIDTH < 1440:
            imgElement = Utils.createImg(data.image.tablet, data.name, 'item-image');
            break;
        case SCREEN_WIDTH < 600:
            imgElement = Utils.createImg(data.image.mobile, data.name, 'item-image');
            break;
        default:
            imgElement = Utils.createImg(data.image.mobile, data.name, 'item-image');
    }

    return imgElement;

}

