const initialState = {
    users: [
        { id: 1, name: 'Hieu' },
        { id: 2, name: 'Gam' }
    ],
    posts: []
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_USER':
            console.log(">>> DELETE_USER: ", action)
            let usersCopy = state.users
            usersCopy = usersCopy.filter(item => item.id !== action.payload.id)
            return { ...state, users: usersCopy }
        case 'CREATE_USER':
            console.log(">>> CREATE USER")
            let id = Math.floor(Math.random() * 100)
            let newUser = { id: id, name: `user${id}` }
            return { ...state, users: [...state.users, newUser] }
        default:
            return state
    }

}
export default rootReducer