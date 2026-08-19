import {useState, useEffect} from 'react';

const useLocalStorage = (key, initialValue) => {

    const [value, setValue] = useState(() => {

        const savedValue = localStorage.getItem(key)

        if(savedValue){
            return JSON.parse(savedValue)
        }        

        return initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]

}

export default useLocalStorage