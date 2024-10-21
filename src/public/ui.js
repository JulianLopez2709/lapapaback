import { saveFood, deleteFood ,getNoteById,updateFood} from "./socket.js";

const newOrderSound = new Audio('./audio/notification.mp3');

export const onHandleSubmit = (e) => {
    e.preventDefault();
    let obj = {
        title: foodForm['title'].value,
        description: foodForm['description'].value
    } 
    saveFood(obj.toString())
    playSound()
}

const foodList = document.querySelector('#foods')

const foodUI = food => {
    const div = document.createElement('div')
    div.innerHTML = `
            <div class="card">
                <div>
                    <h1 class="title">${ food['title']}</h1>
                    <p class="description">${food['description']}</p>
                    <p class="precio">$${food['price']}</p>
                </div>

                <button  class="update" data-id="${food['id']}">
                    <p>LISTO</p>
                </button>
            </div>
            `
    const btnUpdate = div.querySelector('.update')
    btnUpdate.addEventListener('click', (e) => {
        const id = btnUpdate.dataset.id
        getNoteById(id)
    })


    /*const btnDelete = div.querySelector('.delete')
    btnDelete.addEventListener('click', (e) => {
        const id = btnDelete.dataset.id
        deleteFood(id)
    })*/
    return div
}

export const renderFoods = foods => {
    foodList.innerHTML = '';
    foods.forEach(i => {
        if (i['isprocess'] == true) {
            foodList.append(foodUI(i))
        }
    });
}


export const readyFood = food => {
    food[0].isprocess = false
    let string = JSON.stringify(food[0])
    updateFood(string)
}

export const oppendFood = food => {
    foodList.append(foodUI(food))
}


const playNewOrderSound = () => {
    newOrderSound.currentTime = 0; // Reinicia el audio si ya ha sonado
    newOrderSound.play().catch(error => {
        console.error("Error al reproducir el sonido:", error);
    });
};



