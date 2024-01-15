import * as actions from "../actionTypes";

const initialState = {
  currentUser: null,
  allComplexs: [],
  allReviews: [],
  userComplexs: [],
  complexs: [],
  courts: [],
  events: [],
  reviews: [],
  services: [],
  shifts: [],
  typecourts: [],
  detail: {},
  favUser: [],
  allUsers: [],
};

const actionHandlers = {
  [actions.GET_ALL_USER]: (state, action) => ({
    ...state,
    allUsers: action.payload,
  }),
  [actions.GET_ALL_COMPLEX]: (state, action) => ({
    ...state,
    allComplexs: action.payload,
  }),
  [actions.GET_ALL_COURT]: (state, action) => ({
    ...state,
    courts: action.payload,
  }),
  [actions.GET_ALL_EVENT]: (state, action) => ({
    ...state,
    events: action.payload,
  }),
  [actions.GET_ALL_REVIEW]: (state, action) => ({
    ...state,
    reviews: action.payload,
  }),
  [actions.GET_ALL_SERVICES]: (state, action) => ({
    ...state,
    services: action.payload,
  }),
  [actions.GET_ALL_SHIFT]: (state, action) => ({
    ...state,
    shifts: action.payload,
  }),
  [actions.GET_ALL_TYPECOURT]: (state, action) => ({
    ...state,
    typecourts: action.payload,
  }),

  [actions.GET_COMPLEX_DETAIL]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),

  [actions.GET_USER_DETAIL]: (state, action) => ({
    ...state,
    currentUser: action.payload,
  }),

  [actions.FILTER_BY_SPORT]: (state, action) => ({
    ...state,
    complexs: action.payload,
  }),
  [actions.FILTER_BY_SERVICE]: (state, action) => ({
    ...state,
    complexs: action.payload,
  }),
  [actions.FILTER_BY_AZ]: (state, action) => ({
    ...state,
    complexs: action.payload,
  }),
  [actions.FILTER_BY_ZA]: (state, action) => ({
    ...state,
    complexs: action.payload,
  }),
  [actions.REMOVE_FILTERS]: (state, action) => ({
    ...state,
    complexs: [...action.payload],
  }),
  [actions.SEARCH_BY_CITY]: (state, action) => ({
    ...state,
    complexs: action.payload,
    allComplexs: action.payload,
  }),
  [actions.ADD_FAVORITE]: (state, action) => ({
    ...state,
    currentUser: { ...state.currentUser, favorites: action.payload },
  }),
  [actions.SET_CURRENT_USER]: (state, action) => ({
    ...state,
    currentUser: action.payload,
  }),
  [actions.LOGOUT_CURRENT_USER]: (state, action) => ({
    ...state,
    currentUser: action.payload,
  }),
  [actions.CHECK_USER_SESSION]: (state, action) => ({
    ...state,
    currentUser: action.payload,
  }),

  [actions.GET_USER_COMPLEX]: (state, action) => ({
    ...state,
    userComplexs: action.payload,
  }),
  [actions.GET_USER_SHIFT]: (state, action) => ({
    ...state,
    shifts: action.payload,
  }),
};

const rootReducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export default rootReducer;
