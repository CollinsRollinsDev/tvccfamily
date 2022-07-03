export const SET_CURRENT_BOOK = "SET_CURRENT_BOOK";
export const SET_CURRENT_CHAPTER = "SET_CURRENT_CHAPTER";
export const SET_CURRENT_VERSE = "SET_CURRENT_VERSE";
export const SET_CURRENT_SCRIPTURE = "SET_CURRENT_SCRIPTURE";

export const SET_CURRENT_TITLE = "SET_CURRENT_TITLE";
export const SET_CURRENT_POST_ID= "SET_CURRENT_POST_ID";
export const SET_CURRENT_MINISTERING = "SET_CURRENT_MINISTERING";
export const SET_CURRENT_POSTBODY = "SET_CURRENT_POSTBODY";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_UPDATE_TAB_SWITCH = "SET_UPDATE_TAB_SWITCH";
export const SET_Current_Notification = "SET_Current_Notification";
export const SET_IS_NOTIFICATION = "SET_IS_NOTIFICATION";
export const SET_MUSIC_SOUND = "SET_MUSIC_SOUND";

export let setCurrentNotification = (payload) => (dispatch) => {
  dispatch({
    type: SET_Current_Notification,
    payload: payload,
  });
};

export let setIsNotification = (payload) => (dispatch) => {
  dispatch({
    type: SET_IS_NOTIFICATION,
    payload: payload,
  });
};

export let setCurrentBook = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_BOOK,
    payload: payload,
  });
};

export let setCurrentChapter = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_CHAPTER,
    payload: payload,
  });
};

export let setCurrentVerse = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_VERSE,
    payload: payload,
  });
};

export let setCurrentScripture = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_SCRIPTURE,
    payload: payload,
  });
};

export let setCurrentTitle = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TITLE,
    payload: payload,
  });
};

export let setCurrentPostId = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_POST_ID,
    payload: payload,
  });
};

export let setCurrentMinistering = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_MINISTERING,
    payload: payload,
  });
};

 export let setUserDetails = (payload) => (dispatch) => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: payload,
  });
 };

export let setCurrentPostBody = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_POSTBODY,
    payload: payload,
  });
};

  export let setUpdateTebSwitch = (payload) => (dispatch) => {
    dispatch({
      type: SET_UPDATE_TAB_SWITCH,
      payload: payload,
    });
};
  export let setMusicSound = (payload) => (dispatch) => {
    dispatch({
      type: SET_MUSIC_SOUND,
      payload: payload,
    });
};
