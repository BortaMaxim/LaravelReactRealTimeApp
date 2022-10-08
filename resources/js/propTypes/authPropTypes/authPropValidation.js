import PropTypes from "prop-types";
import {propTypesValidation} from '../propTypesValidation'

const propTypes = {
    loading: PropTypes.bool,
    errorResponse: PropTypes.object,
    profile: PropTypes.object,
    isShow: PropTypes.bool,
}

export const authPropValidation = propTypesValidation(propTypes)
