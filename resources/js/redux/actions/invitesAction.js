// import * as InviteActionTypes from '../types/inviteActionTypes'
import {BASE_AUTH_URL, getAuthOptions, toastOptions} from '../utils'
import {toast} from "react-toastify";


export const AcceptInviteAction = (inviteId, requestType, token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}accept-invite/${inviteId}`, getAuthOptions(token))
        .then(res => {
            switch (requestType) {
                case 'INVT':
                    if (res.status === 200) {
                        toast.success(res.data.original, toastOptions('top-right'))
                    }
                    break;
                case 'JOIN':
                    if (res.status === 200) {
                        toast.success(res.data.original, toastOptions('top-right'))
                    }
                    break;
                default:
                    break;
            }
        })
}
