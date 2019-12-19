import { SET_LANGUAGE } from '../actionType'

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

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      console.log(action)
      return {
        lang: action.payload,
        permissions: permissions[action.payload] || state.permissions
      }
    default:
      return state;
  }
}

export default languageReducer