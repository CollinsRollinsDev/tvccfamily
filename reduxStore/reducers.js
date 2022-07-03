import {
  SET_CURRENT_BOOK,
  SET_CURRENT_CHAPTER,
  SET_CURRENT_VERSE,
  SET_CURRENT_SCRIPTURE,
  SET_CURRENT_TITLE,
  SET_CURRENT_MINISTERING,
  SET_CURRENT_POSTBODY,
  SET_USER_DETAILS,
  SET_UPDATE_TAB_SWITCH,
  SET_CURRENT_POST_ID,
  SET_Current_Notification,
  SET_IS_NOTIFICATION,
  SET_MUSIC_SOUND,
} from "./actions";

let initialState = {
  currentBook: "",
  currentChapter: "",
  currentVerse: "",
  currentTitle: "",
  currentMinistering: "",
  currentPostBody: "",
  currentScripture: [],
  userDetails: {},
  updateTabSwitch: false,
  currentPostId: "",
  currentNotification: {},
  isNotification: false,
  musicSound:null
};

function useTheReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_BOOK:
      return { ...state, currentBook: action.payload };

    case SET_Current_Notification:
      return { ...state, currentNotification: action.payload };

    case SET_CURRENT_CHAPTER:
      return { ...state, currentChapter: action.payload };

    case SET_CURRENT_VERSE:
      return { ...state, currentVerse: action.payload };

    case SET_CURRENT_SCRIPTURE:
      return { ...state, currentScripture: action.payload };

    case SET_CURRENT_TITLE:
      return { ...state, currentTitle: action.payload };

    case SET_CURRENT_POST_ID:
      return { ...state, currentPostId: action.payload };

    case SET_CURRENT_MINISTERING:
      return { ...state, currentMinistering: action.payload };

    case SET_CURRENT_POSTBODY:
      return { ...state, currentPostBody: action.payload };

    case SET_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    case SET_UPDATE_TAB_SWITCH:
      return { ...state, updateTabSwitch: action.payload };
    case SET_IS_NOTIFICATION:
      return { ...state, isNotification: action.payload };
    case SET_MUSIC_SOUND:
      return { ...state, musicSound: action.payload };
    default:
      return state;
  }
}

export default useTheReducer;
