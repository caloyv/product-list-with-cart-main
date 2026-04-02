import * as Utils from "./Utils.js";
import * as UIUpdates from "./UIUpdatesUtils.js";
import {removeAllOrder, TOTAL_ORDER } from "./state.js";

export default function(data) {

    document.addEventListener("click", (e) => {
        const cartIconContainer = e.target.closest(".add-to-cart-container");
        const plusIconContainer = e.target.closest(".plus-icon-container");
        const minusIconContainer = e.target.closest(".minus-icon-container");
        const confirmBtn = e.target.closest(".confirm-btn");
        const startNewBtn = e.target.closest('.start-new-btn');
        const removeItemIconContainer = e.target.closest(".remove-item-icon-container");
        const confirmationWindowContainer = document.querySelector('.confirmation-window-container');
        const confirmationWindowContainer2 = e.target.closest('.confirmation-window-container');
        const confirmationWindow = e.target.closest('.confirmation-window');
        

        if (cartIconContainer) {
            const dataId = cartIconContainer.getAttribute("data-id");


            if (plusIconContainer) {
                TOTAL_ORDER[dataId]++;
                cartIconContainer.querySelector(".quantity").textContent = TOTAL_ORDER[dataId];
                UIUpdates.updateTotalCartUI(data, TOTAL_ORDER);
                return;
            } else if (minusIconContainer) {
                TOTAL_ORDER[dataId] = Math.max(0, TOTAL_ORDER[dataId] - 1);
                cartIconContainer.querySelector(".quantity").textContent = TOTAL_ORDER[dataId];

                if (TOTAL_ORDER[dataId] == 0) 
                    UIUpdates.disableCart(cartIconContainer, dataId);

                UIUpdates.updateTotalCartUI(data, TOTAL_ORDER);
                return;
            }

            if (TOTAL_ORDER[dataId] == 0) {
                TOTAL_ORDER[dataId] = 1;
                UIUpdates.activeCart(cartIconContainer, TOTAL_ORDER[dataId], dataId);
                UIUpdates.updateTotalCartUI(data, TOTAL_ORDER);
            }
        }

        if (removeItemIconContainer) {
            const dataId = removeItemIconContainer.getAttribute('data-id');
            const cartIconContainerAll = document.querySelectorAll('.add-to-cart-container')
            let cartIconLocal;

            cartIconContainerAll.forEach(cartIcon => {
                if (cartIcon.getAttribute('data-id') == dataId) {
                    cartIconLocal = cartIcon;
                }
            })
            
            TOTAL_ORDER[dataId] = Math.max(0, TOTAL_ORDER[dataId] - 1);
            cartIconLocal.querySelector(".quantity").textContent = TOTAL_ORDER[dataId];

            if (TOTAL_ORDER[dataId] == 0) 
                disableCart(cartIconLocal);

            UIUpdates.updateTotalCartUI(data, TOTAL_ORDER);
        }

        // small window for when the order is confirmed
        if (confirmBtn) {
            document.body.classList.add('no-scroll')
            confirmationWindowContainer.classList.add('active');


            let totalAmountOrder = 0;
            let totalOrder = 0;

            const orderedItemListDiv = document.querySelector('.ordered-item-list');
            const orderedTotalAmount = document.querySelector('.ordered-total-amount');
            orderedItemListDiv.replaceChildren();
            
            // 
            TOTAL_ORDER.forEach((order, index) => {
                if (order) {
                        totalOrder = data[index].price * order;

                    totalAmountOrder = totalAmountOrder + totalOrder;
                    const orderedItemDiv = Utils.createDiv('ordered-item');
                    const orderedItemDetailsContainer = Utils.createDiv('ordered-item-details-container')
                    const orderedItemThumbnailContainer = Utils.createDiv('ordered-item-thumbnail-container');
                    const orderedItemDetails = Utils.createDiv('ordered-item-details');
                    const orderedItemQuantityContainer = Utils.createDiv('ordered-item-quantity-container');

                    const orderedItemThumbnail = Utils.createImg(data[index].image.thumbnail, data[index].name);
                    const orderedItemName = Utils.createParagraph(data[index].name, 'ordered-item-name');
                    const orderedItemQuantity = Utils.createParagraph(`${order}x`, 'ordered-item-quantity');
                    const orderedItemIndividualPrice = Utils.createParagraph(`@ $${Utils.formatPrice(data[index].price)}`, 'ordered-item-individual-price')

                    const orderedItemTotalPrice = Utils.createParagraph(`$${Utils.formatPrice(data[index].price * order)}`, 'ordered-item-total-price');

                    orderedItemThumbnailContainer.appendChild(orderedItemThumbnail);
                    orderedItemDetailsContainer.appendChild(orderedItemThumbnailContainer);

                    orderedItemQuantityContainer.appendChild(orderedItemQuantity);
                    orderedItemQuantityContainer.appendChild(orderedItemIndividualPrice);

                    orderedItemDetails.appendChild(orderedItemName);
                    orderedItemDetails.appendChild(orderedItemQuantityContainer);

                    orderedItemDetailsContainer.appendChild(orderedItemDetails)

                    orderedItemDiv.appendChild(orderedItemDetailsContainer);
                    orderedItemDiv.appendChild(orderedItemTotalPrice);
                    
                    orderedItemListDiv.appendChild(orderedItemDiv);
                }
            })
            orderedTotalAmount.textContent = `$${Utils.formatPrice(totalAmountOrder)}`;


        }

        if (startNewBtn) {
            document.body.classList.remove('no-scroll')
            confirmationWindowContainer.classList.remove('active')
            removeAllOrder();
            document.querySelector(".items-container").replaceChildren();
            data.forEach((data, index) => {
                UIUpdates.showItem(data, index);
            })
            UIUpdates.updateTotalCartUI(data, TOTAL_ORDER);
            
        }

        if (confirmationWindowContainer2) {
            if (confirmationWindow) {
                console.log("TEST")
            } else {
                console.log('confirmation-window-container')
                document.body.classList.remove('no-scroll');
                confirmationWindowContainer.classList.remove('active');
            }

        }


    });
}