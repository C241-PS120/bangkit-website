import { create } from "zustand"

interface LoginErrorState{
    error: boolean
    setError: () => void
    clearError: () => void
}

const InitialState = false

const useLoginErrorStore = create<LoginErrorState>()((set) => ({
    error : InitialState,
    setError: () => set(({ error: true })),
    clearError: () => set({error: InitialState}),
}))

export default useLoginErrorStore