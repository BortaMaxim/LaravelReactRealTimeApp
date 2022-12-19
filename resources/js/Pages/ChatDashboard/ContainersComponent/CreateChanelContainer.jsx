import React from 'react';
import {useModal} from "../../../hooks/useModal";
import {CreateChannel} from "../CreateChannel";
import {CreateChannelForm} from "../../../Components/Channels/CreateChannelForm";
import CreateChannelModal from "../../../Components/Details/Modal";

export const CreateChanelContainer = (props) => {
    const {fields, createChannel, handleCheck, handleChange, createChannelSelector} = props
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
                    createChannelSelector={createChannelSelector}
                    fields={fields}
                    handleChange={handleChange}
                    handleCheck={handleCheck}
                    createChannel={createChannel}
                />
            </CreateChannelModal>
        </>
    )
}
