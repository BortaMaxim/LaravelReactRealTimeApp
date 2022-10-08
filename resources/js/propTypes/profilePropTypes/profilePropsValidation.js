import PropTypes from "prop-types";
import {propTypesValidation} from "../propTypesValidation";

const propTypes = {
    loading: PropTypes.bool,
    validation: PropTypes.object,
    profileUpdated: PropTypes.object,
}

export const profilePropsValidation = propTypesValidation(propTypes)
