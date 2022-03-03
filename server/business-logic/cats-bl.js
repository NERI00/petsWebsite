import catsDal from "../data-access-layer/cats-dal.js"
import { isObjEmpty } from "../common/helper.js"
import ownersDal from "../data-access-layer/owners-dal.js"

const getAll = () => {
    return catsDal.getAll()
}

const getById = id => {
    let cats = catsDal.getAll()
    let requestedCats = cats.find(cats => cats.id === id)

    return requestedCats ?? {}
}

const addCat = newCat => {
    const cats = catsDal.getAll()
    const lastId = cats[cats.length - 1].id

    const preperedCatsObj = {
        id: lastId + 1,
        ...newCat
    }

    catsDal.addCat(preperedCatsObj)

    return preperedCatsObj
}
const deleteById = id => {
    let cats = catsDal.getAll()
    let filteredList = cats.filter(cats => cats.id !== id)

    catsDal.resetAll(filteredList)
}
const getOwnerDetailById = id => {
    let requestedOwnerObj = {}
    let requestedCat = getById(id)

    if (isObjEmpty(requestedCat) || !requestedCat.ownerId) {
        return {}
    }
    let ownerId = requestedCat.ownerId

    requestedOwnerObj = ownersDal.getById(ownerId)

    return requestedOwnerObj ?? {}
}


export default {
    getAll,
    getById,
    addCat,
    deleteById,
    getOwnerDetailById
} 