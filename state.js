export let TOTAL_ORDER;
export let SCREEN_WIDTH = window.innerWidth;

export const initOrder = (data) => {
    TOTAL_ORDER = new Array(data.length).fill(0);
};


export const updateOrderItem = (index, value) => {
    if (TOTAL_ORDER[index] !== undefined) {
        TOTAL_ORDER[index] = value;
    }
};

export const removeAllOrder = () => {
    for (let i = 0;i < TOTAL_ORDER.length; i++) {
        TOTAL_ORDER[i] = 0;
    }
}


export const updateScreenWidth = () => SCREEN_WIDTH = window.innerWidth;