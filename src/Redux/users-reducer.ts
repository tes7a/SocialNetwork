import { Dispatch } from "redux";
import { userAPI } from "../api/api";

export type LocationType = {
    city: string,
    country: string,
}

export type UserType = {
    id: number,
    followed: boolean,
    name: string,
    status: string,
    location: LocationType,
    photos: {
        small: string
        large: string
    }
}

export type InitialState = {
    users: UserType[],
    pageSize: number,
    totalUserCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}

const initialState: InitialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const userReducer = (state = initialState, action: ActionsTypeUsersReducer): InitialState => {
        switch (action.type) {
            case "FOLLOW":
                return {
                    ...state,
                    users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
                }
            case "UNFOLLOW":
                return {
                    ...state,
                    users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
                }
            case "SET-USERS":
                return {...state, users: action.users}
            case "SET-CURRENT-PAGE":
                return {...state, currentPage: action.currentPage}
            case "SET-USER-TOTAL-COUNT":
                return {...state, totalUserCount: action.totalCount}
            case "SET-TOGGLE-IS-FETCHING":
                return {...state, isFetching: action.isFetching}
            case "TOGLE-IS-FOLLOWING":
                return {
                    ...state,
                    followingInProgress: action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id != action.userId)
                }
            default:
                return state
        }
    }
;

type ActionsTypeUsersReducer =
    | FollowType
    | UnFollowType
    | SetUsersType
    | SetCurrentPageType
    | SetUserTotalCount
    | TypeSetToggleIsFetching
    | ReturnType<typeof togleIsFollowingProgress>

type FollowType = ReturnType<typeof followAC>;

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
};

type UnFollowType = ReturnType<typeof unFollowAC>;

export const unFollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
};

type SetUsersType = ReturnType<typeof setUsersAC>;

export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'SET-USERS',
        users
    } as const
};

type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>;

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
};

type SetUserTotalCount = ReturnType<typeof setUserTotalCountAC>;

export const setUserTotalCountAC = (totalCount: number) => {
    return {
        type: 'SET-USER-TOTAL-COUNT',
        totalCount
    } as const
};

type TypeSetToggleIsFetching = ReturnType<typeof setToggleIsFetchingAC>;

export const setToggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: 'SET-TOGGLE-IS-FETCHING',
        isFetching
    } as const
}

export const togleIsFollowingProgress = (isFetching: boolean, userId: number) =>
    ({type: 'TOGLE-IS-FOLLOWING', isFetching, userId} as const)

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    if (initialState.users.length === 0) {
        dispatch(setToggleIsFetchingAC(true));

        userAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setToggleIsFetchingAC(false));
                dispatch(setUsersAC(data.items));
                dispatch(setCurrentPageAC(currentPage));
                dispatch(setUserTotalCountAC(data.totalCount));
            });
    }
}

export const setFollow = (userId: number) => (dispatch: Dispatch) => {
    dispatch(togleIsFollowingProgress(true, userId));
    userAPI.follow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followAC(userId));
            }
            dispatch(togleIsFollowingProgress(false, userId));
        });
}

export const setUnFollow = (userId: number) => (dispatch: Dispatch) => {
    dispatch(togleIsFollowingProgress(true, userId));
    userAPI.unfollow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unFollowAC(userId));
            }
           dispatch(togleIsFollowingProgress(false, userId));
        });
}