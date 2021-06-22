const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const updateObjectInArray = (oldArray, action) => {
    return oldArray.map((item, index) => {
        if (index !== action.index) {
            return item
        }
        return {
            ...item,
            ...action.item
        }
    })
}

export {
    updateObject,
    updateObjectInArray
};