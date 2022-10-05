import {useSelector} from "react-redux";

export const authSelector = () => {
    return useSelector((state) => ({
        loading: state.auth.loading,
        errorResponse: state.auth.errorResponse,
        profile: state.auth.profile,
        isShow: state.auth.isShow,
    }))
}
