import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"

interface ValidData{
    validate: boolean,
    expire: Date
}

interface AuthState{
    data: ValidData
    setValidate: () => void,
    clearValidate: () => void,
}

const InitialState: ValidData = {
    validate: false,
    expire: new Date(),
}

const useAuth = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                data: InitialState,
                setValidate: () => {set({data: {
                    validate: true,
                    expire: getTomorrowDate()
                }})},
                clearValidate: () => {set({data: InitialState})},
            }),
            {name: "validate"}
        )
    )   
)

function getTomorrowDate(): Date{
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date
}

export default useAuth