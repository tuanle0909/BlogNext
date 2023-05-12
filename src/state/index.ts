import React from "react";
import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
    currentUser: null,
    token: null,
    articleGeneral: null,
    authorId: null,
    articleId: null,
    newComment: []
}

const { useGlobalState } = createGlobalState(initialState)

export { useGlobalState }