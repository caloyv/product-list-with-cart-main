import * as UIUpdates from "./UIUpdatesUtils.js";
import getData from "./getData.js";
import ClickEventListener from "./ClickEventListener.js";
import { initOrder, updateScreenWidth } from "./state.js";
import { debounce } from "./Utils.js";



async function main() {

    try {
        const data = await getData();
        initOrder(data);
        

        const render = () => {
            const container = document.querySelector(".items-container");
            if (container) container.innerHTML = "";

            data.forEach((data, index) => {
                UIUpdates.showItem(data, index, window.innerWidth);
            });
        }

        render();


        window.addEventListener('resize', debounce(() => {
            updateScreenWidth()
            render();

        }, 250))


        ClickEventListener(data);
        
    } catch (error) {
        console.error(`ERROR!: ${error} `);
    }
}




main();
