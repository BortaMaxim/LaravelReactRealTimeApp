import {propTypesValidation} from '../propTypesValidation'
import PropTypes from "prop-types";

const propTypes = {
    recipient: PropTypes.shape({
        avatar: PropTypes.string,
        created_at: PropTypes.string,
        mail: PropTypes.string,
        email_verified_at: PropTypes.string,
        id: PropTypes.array,
        name: PropTypes.string,
        status: PropTypes.string,
        updated_at: PropTypes.string,
    }),
    unreadMessagesCount: PropTypes.number,
    loading: PropTypes.bool,
    createChannelExeption: PropTypes.object,
    channels: PropTypes.array,
}

export const chatPropsValidation = propTypesValidation(propTypes)
