import { loadFood, onNewFood, onSelectFood} from "./socket.js";
import { onHandleSubmit,renderFoods,oppendFood, readyFood  } from "./ui.js";


onNewFood(oppendFood)
loadFood(renderFoods);
onSelectFood(readyFood)

//const foodForm = document.querySelector("#foodForm");
//foodForm.addEventListener('submit', onHandleSubmit);


