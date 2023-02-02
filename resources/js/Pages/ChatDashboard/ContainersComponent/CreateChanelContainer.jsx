import React from 'react';
import {useModal} from "../../../hooks/useModal";
import {CreateChannel} from "../CreateChannel";
import {CreateChannelForm} from "../../../Components/Channels/CreateChannelForm";
import CreateChannelModal from "../../../Components/Details/Modal";
import PropTypes from "prop-types";

export const CreateChanelContainer = (props) => {

    const {
        fields,
        createChannel,
        handleCheck,
        handleChange,
        getAllChannelsSelector,
        compareType,
        compareVisible
    } = props
    const {active, setActive} = useModal()

    return (
        <>
            <CreateChannel
                handleOpen={() => setActive(true)}
            />
            <CreateChannelModal
                isOpen={active}
                handleClose={() => setActive(false)}
                title="Create channel:"
            >
                <CreateChannelForm
                    compareType={compareType}
                    compareVisible={compareVisible}
                    getAllChannelsSelector={getAllChannelsSelector}
                    fields={fields}
                    handleChange={handleChange}
                    handleCheck={handleCheck}
                    createChannel={createChannel}
                />
            </CreateChannelModal>
        </>
    )
}

CreateChanelContainer.propTypes = {
    fields: PropTypes.object,
    createChannel: PropTypes.func.isRequired,
    handleCheck: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    createChannelSelector: PropTypes.object,
    compareType: PropTypes.string,
    compareVisible: PropTypes.string,
}
