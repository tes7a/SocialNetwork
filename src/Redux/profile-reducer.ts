import {ActionTypes, PostsType, ProfilePageType, RootStateType, store} from "./store";

const initialState: ProfilePageType = {
    messageForNewPost: 'asdsd',
    posts: [] as PostsType[],
}


const profileReducer = (state = initialState, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: action.postMessage,
                likeCount: 0
            }
            state.posts.push(newPost);
            return state
        }
        case "CHANGE-TEXT": {
            state.messageForNewPost = action.newText
            return state
        }
        default:
            return state
    }
}

export type ActionTypesProfileReducer = AddPostType | ChangeTextType

export type AddPostType = ReturnType<typeof addPost>;

export const addPost = (postMessage: string) => {
    return {
        type: "ADD-POST",
        postMessage,
    } as const
};

export type ChangeTextType = ReturnType<typeof changeText>;

export const changeText = (newText: string) => {
    return {
        type: "CHANGE-TEXT",
        newText,
    } as const
};

export default profileReducer;