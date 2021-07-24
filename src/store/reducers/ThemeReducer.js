import * as actions from '../actions/ActionTypes';

const initialState ={
    dark:false,

}

export function themeReducer(state=initialState, action){
    switch(action.type){
        case actions.THEME_CHANGED:
            return{
                ...state,
                dark:action.payload
            }
        default:
            return state;
    }
}

//selector function

export const getSelectedTheme = (state) => state.dark;