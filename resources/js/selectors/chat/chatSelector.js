import {useSelector} from "react-redux";


export const chatSelector = () => {
    return useSelector(state => ({
        loading: state.chat.loading,
        friends: state.chat.friends,
    }))
}
