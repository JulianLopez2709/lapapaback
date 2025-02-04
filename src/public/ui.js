import { saveFood, deleteFood, getNoteById, updateFood } from "./socket.js";

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
    const foodNoteText = food['description'].split(">")

    const listSalsa = foodNoteText[3].replace(/[^\w\s,]/g, '').split(',').map(item => item.trim());
    console.log(listSalsa)

    div.innerHTML = `
            <div class="card">
                    <div class="" style="display: flex; align-items: center; justify-content: space-between;">
                        <div class="" style="display: flex; align-items: center; justify-content: space-between; margin-bottom:10px;">
                            <h1 class="title">${foodNoteText[2]} ${food['title']}</h1>
                            <div class="table">
                                <h2 class="">Mesa ${food['table']}</h2> 
                            </div>
                        </div>
                        <p id="duration-${food['id']}">${food['duration']}</p>
                    </div>
                    <div class="description"> 
                        <p class ="description-ingredient">${foodNoteText[0]} </p>
                        <p class ="description-note">${foodNoteText[1]}</p>
                        <div class="description-information">
                            ${listSalsa.map(item => {
                                return `<div class="description-salsa">${item}</div>`
                            }).join("")}
                        </div>
                    </div>

                    <div  class ="card-total">
                        <p class="card-total-precio">$${food['price']}</p>
                        <button  class="update" data-id="${food['id']}">
                        <p>LISTO</p>
                    </div>
                </button>
            </div>
            `
    const btnUpdate = div.querySelector('.update')
    btnUpdate.addEventListener('click', (e) => {
        const id = btnUpdate.dataset.id
        getNoteById(id)
    })

    
    //startCountdown(food.id, food.duration, div);
    /*document.addEventListener('DOMContentLoaded', () => {
        startCountdown(food.id, food.duration);
    })*/
    /*const btnDelete = div.querySelector('.delete')
    btnDelete.addEventListener('click', (e) => {
        const id = btnDelete.dataset.id
        deleteFood(id)
    })*/
    return div
}

const startCountdown = (id, duration, element) => {
        let timeLeft = Number(duration) * 60;
        const durationElement = element.querySelector(`#duration-${id}`);

        const interval = setInterval(() => {
            timeLeft--;
            console.log()
            durationElement.innerHTML = formatTime(timeLeft)
            if (timeLeft <= 0) {
                clearInterval(interval);
            }
        }, 1000);
};


const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export const renderFoods = foods => {
    foodList.innerHTML = '';
    foods.forEach(i => {
        console.log("los productos"+foods[1]["isprocess"])
        if (i['isprocess'] == "true") {
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



