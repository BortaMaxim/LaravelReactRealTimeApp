export const compareChannelUsers = (usersOfChannel, authUserId) => {
    return usersOfChannel !== undefined && usersOfChannel.find(user => user.id === authUserId)
}
