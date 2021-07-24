import * as actionType from './ActionTypes';

export const selectTheme = (theme) => ({
    type: actionType.THEME_CHANGED,
    payload: theme
})

export const setCategoryId = (id) => ({
    type: actionType.CATEGORY_CHANGE,
    payload: id 
})