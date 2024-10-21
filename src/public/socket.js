const socket = io()

export const loadFood = (callback)=>{
    socket.on("server:loadfood", callback)
}

export const saveFood= (data) => {
    socket.emit("client:newfood",data)
}

export const onNewFood = (callback)=>{
    socket.on("server:newfood",callback)
}

export const deleteFood = (id) => {
    socket.emit("client:deletefood", id)
}


export const getNoteById = (id)=>{
    socket.emit("client:getfood",id)
}

export const onSelectFood = (callback)=>{
    socket.on('server:getfood', callback)
}


export const updateFood = (food)=>{
    socket.emit('client:update',food)
}


