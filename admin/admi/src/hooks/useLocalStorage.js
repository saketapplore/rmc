import { useState } from 'react'
 
const useLocalStorage = (key, initialValue) => {

    const [value, setValue] = useState(() => {

        try {
            
            const storedValue = localStorage.getItem(key)

            return storedValue ? JSON.parse(storedValue) : initialValue


        } catch (error) {
            
            console.error('localStorage error:', error)

            return initialValue

        }

    })


    const updateValue = (newValue) => {

        setValue(newValue)

        localStorage.setItem(
            key,
            JSON.stringify(newValue)
        )

    }

    return [value, updateValue]
}

export default useLocalStorage;