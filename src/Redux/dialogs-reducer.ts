import {ActionTypes, DialogsPageType, RootStateType, store} from "./store";

// const rootState: RootStateType = store.gateState();
const initialState = {
    dialogs: [
        {id: 1, name: "Kostya"},
        {id: 2, name: "Tanya"},
        {id: 3, name: "Igor"},
        {id: 4, name: "Max"},
        {id: 5, name: "Rada"},
        {id: 6, name: "Ruslan"},
        {id: 7, name: "Nastya"}
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Yo"},
        {id: 3, message: "How are you?"},
        {id: 4, message: "Gl"},
        {id: 5, message: "Thx"}
    ],
    newMessageBody: '',
}

const dialogsReducer = (state = initialState, action: ActionTypes): DialogsPageType => {
    switch (action.type) {
        case "NEW-MESSAGE-BODY": {
            state.newMessageBody = action.body;
            return state
        }
        case "SEND-MESSAGE": {
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push(
                {
                    id: new Date().getTime(),
                    message: body
                });
            return state
        }
        default:
            return state
    }
}

export type ActionTypesDialogsReducer = NewMessageBodyDialogType | SendMessageType

export type NewMessageBodyDialogType = ReturnType<typeof newMessageBodyDialog>;

export const newMessageBodyDialog = (body: string) => {
    return {
        type: "NEW-MESSAGE-BODY",
        body,
    } as const
};

export type SendMessageType = ReturnType<typeof sendMessage>;

export const sendMessage = (newMessage: string) => {
    return {
        type: "SEND-MESSAGE",
        newMessage
    } as const
};

export default dialogsReducer;