import ProfileProvider from "./ProfileProvider";
import FriendsProvider from "./FriendsProvider";
import NotificationsProvider from "./NotificationsProvider";
import {ActiveUserIdProvider} from "./ActiveUserIdProvider";
import {ConversationProvider} from "./ConversationProvider";
import {LastMessageProvider} from "./LastMessageProvider";
import {IsLoadingProvider} from "./IsLoadingProvider";
import {PublicMessagesProvider} from "./PublicMessagesProvider";
import {PrivateMessagesProvider} from "./PrivateMessagesProvider";
import PublicChannelProvider from "./PublicChannelProvider";
import PrivateChannelProvider from "./PrivateChannelProvider";
import {AllPublicChannelsProvider} from "./AllPublicChannelsProvider";
import AllPrivateChannelsProvider from "./AllPrivateChannelsProvider";


const combineComponents = (...components) => {
    return components.reduce(
        (AccumulatedComponents, CurrentComponent) => {
            return ({ children }) => {
                return (
                    <AccumulatedComponents>
                        <CurrentComponent>{children}</CurrentComponent>
                    </AccumulatedComponents>
                );
            };
        },
        ({ children }) => <>{children}</>,
    );
};

const providers = [
    ProfileProvider,
    FriendsProvider,
    NotificationsProvider,
    ActiveUserIdProvider,
    ConversationProvider,
    LastMessageProvider,
    IsLoadingProvider,
    PublicMessagesProvider,
    PrivateMessagesProvider,
    PublicChannelProvider,
    PrivateChannelProvider,
    AllPublicChannelsProvider,
    AllPrivateChannelsProvider
]

export const AppContextProvider = combineComponents(...providers)
