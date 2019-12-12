import React, { useReducer } from "react";

const SET_LANGUAGE = 'SET_LANGUAGE'
const permissions = {
  de: {
    newsletter: true,
    gender: false
  },
  uk: {
    newsletter: false,
    gender: true
  }
}
const initialState = {
  lang: 'de',
  permissions: permissions.de
}

function languageReducer(state, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        lang: action.value,
        permissions: permissions[action.value] || state.permissions
      }
    default:
      return state;
  }
}

const useReducerLanguage = () => {
  const [state, dispatch] = useReducer(languageReducer, initialState);
  const actions = {
    setLanguage: lang => dispatch({ type: SET_LANGUAGE, value: lang})
  }

  return [state, actions]
}

export default useReducerLanguage