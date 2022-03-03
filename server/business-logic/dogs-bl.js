import dogsDal from "../data-access-layer/dogs-dal.js"
import ownersDal from "../data-access-layer/owners-dal.js"
import { isObjEmpty } from "../common/helper.js"


const getAll = () => {
    return dogsDal.getAll()
}

const getById = id => {
    let dogs = dogsDal.getAll()
    let requestedDogs = dogs.find(dogs => dogs.id === id)

    return requestedDogs ?? {}
}

const addDog = newDog => {
    const dogs = dogsDal.getAll()
    const lastId = dogs[dogs.length - 1].id

    const preperedDogsObj = {
        id: lastId + 1,
        ...newDog
    }

    dogsDal.addDog(preperedDogsObj)

    return preperedDogsObj
}

const deleteById = id => {
    let dogs = dogsDal.getAll()
    let filteredList = dogs.filter(dogs => dogs.id !== id)

    dogsDal.resetAll(filteredList)
}

const getOwnerDetailById = id => {
    let requestedOwnerObj = {}
    let requestedDog = getById(id)

    if (isObjEmpty(requestedDog) || !requestedDog.ownerId) {
        return {}
    }
    let ownerId = requestedDog.ownerId
    
    requestedOwnerObj = ownersDal.getById(ownerId)

    return requestedOwnerObj ?? {}
}

export default {
    getAll,
    getById,
    addDog,
    deleteById,
    getOwnerDetailById
} 