import {useSelector} from "react-redux";

export const authSelector = () => {
    return useSelector((state) => ({
        loading: state.auth.loading,
        successResponse: state.auth.successResponse,
        errorResponse: state.auth.errorResponse,
        profile: state.auth.profile,
        passwordResetToken: state.auth.passwordResetToken,
        isShow: state.auth.isShow,
    }))
}
