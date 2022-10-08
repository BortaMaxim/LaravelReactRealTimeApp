import {useSelector} from "react-redux";
import {profilePropsValidation} from "../../propTypes/profilePropTypes/profilePropsValidation";

export const profileSelector = () => {
    return profilePropsValidation(useSelector(state => ({
        loading: state.profile.loading,
        validation: state.profile.validation,
        profileUpdated: state.profile.profileUpdated
    })))
}
