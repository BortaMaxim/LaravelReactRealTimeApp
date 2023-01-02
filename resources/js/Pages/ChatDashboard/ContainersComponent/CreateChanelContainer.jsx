import React, {memo} from 'react';
import {useModal} from "../../../hooks/useModal";
import {CreateChannel} from "../CreateChannel";
import {CreateChannelForm} from "../../../Components/Channels/CreateChannelForm";
import CreateChannelModal from "../../../Components/Details/Modal";

export const CreateChanelContainer = memo((props) => {
    const {fields, createChannel, handleCheck, handleChange, createChannelSelector, compareType, compareVisible} = props
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
                    createChannelSelector={createChannelSelector}
                    fields={fields}
                    handleChange={handleChange}
                    handleCheck={handleCheck}
                    createChannel={createChannel}
                />
            </CreateChannelModal>
        </>
    )
})
