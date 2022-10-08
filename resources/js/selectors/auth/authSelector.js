import {useSelector} from "react-redux";
import {authPropValidation} from "../../propTypes/authPropTypes/authPropValidation";

export const authSelector = () => {
    return authPropValidation(useSelector((state) => ({
        loading: state.auth.loading,
        errorResponse: state.auth.errorResponse,
        profile: state.auth.profile,
        isShow: state.auth.isShow,
    })))
}

