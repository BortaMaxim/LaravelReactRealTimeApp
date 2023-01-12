// import * as InviteActionTypes from '../types/inviteActionTypes'
import {BASE_AUTH_URL, getAuthOptions} from '../utils'
import {echoInstance} from "../../bootstrap";


export const AcceptInviteAction = (inviteId, requestType, token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}accept-invite/${inviteId}`, getAuthOptions(token))
        .then(res => {
            const echo = echoInstance(token)
            echo.private(`event.acceptRequest.${inviteId}`)
                .listen('AcceptRequest', (data) => {
                    console.log('echo data', data)
                })
            console.log(res)
            console.log('requestType', requestType)
            switch (requestType) {
                case 'INVT':
                    console.log('INVT')
                    break;
                case 'JOIN':
                    console.log('JOIN')
                    break;
                default:
                    break;
            }
        })
}
