import * as actions from '../actions/ActionTypes';

const initialState ={
    id:185,

}

export function categoryReducer(state=initialState, action){
    switch(action.type){
        case actions.CATEGORY_CHANGE:
            console.log(action);
            return{
                ...state,
                id:action.payload
            }
        default:
            return state;
    }
}

//selector function

export const getSelectedId = (state) => state.id;