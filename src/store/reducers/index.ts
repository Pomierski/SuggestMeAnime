import { APIData, APIRecommendationsData } from "../../types/APIData";
import {
  StoreAction,
  StoreDataAction,
  StoreSearchAction,
  StoreUiAction,
} from "../actions";

export interface Store {
  data: StoreData;
  ui: StoreUi;
  search: StoreSearch;
}

export interface Index {
  page: number;
  item: number;
}

export interface StoreData {
  query: string | null;
  queryID: number | null;
  queryResultArray: APIData[];
  queryResultSingleItem: APIData | null;
  currentAnime: APIData | null;
  currentIndex: Index;
  recommendationsArray: APIRecommendationsData[];
  isInitialized: boolean;
}

export interface StoreUi {
  showError: boolean;
  showNav: boolean;
  showTrailer: boolean;
  showModal: boolean;
  showLoading: boolean;
}

export interface StoreSearch {
  genre?: string;
  rating?: string;
  status?: string;
  type?: string;
  order?: string;
}

const initialState: Store = {
  data: {
    query: null,
    queryID: null,
    queryResultArray: [],
    queryResultSingleItem: null,
    currentAnime: null,
    currentIndex: { page: 1, item: 0 },
    recommendationsArray: [],
    isInitialized: false,
  },
  ui: {
    showError: false,
    showNav: false,
    showTrailer: false,
    showModal: false,
    showLoading: false,
  },
  search: {
    genre: "",
    rating: "",
    status: "",
    type: "",
    order: "",
  },
};

enum StoreKey {
  data = "data",
  search = "search",
  ui = "ui",
}

const updateState = (
  state: Store,
  key: StoreKey,
  nextState: Partial<StoreData> | Partial<StoreUi> | Partial<StoreSearch>
) => ({
  ...state,
  [key]: {
    ...state[key],
    ...nextState,
  },
});

const rootReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case StoreDataAction.isDataInitialized: {
      return updateState(state, StoreKey.data, {
        isInitialized: action.payload,
      });
    }
    case StoreDataAction.updateData: {
      return updateState(state, StoreKey.data, {
        queryResultArray: action.payload.data,
        queryResultSingleItem: action.payload.data[action.payload.item],
        queryID: action.payload.data[action.payload.item].mal_id,
      });
    }
    case StoreDataAction.updateQueryResultArray: {
      return updateState(state, StoreKey.data, {
        queryResultArray: [...action.payload],
      });
    }
    case StoreDataAction.updateQueryResultSingleItem: {
      return updateState(state, StoreKey.data, {
        queryResultSingleItem: action.payload,
      });
    }
    case StoreDataAction.updateQuery: {
      return updateState(state, StoreKey.data, { query: action.payload });
    }
    case StoreDataAction.updateQueryID: {
      return updateState(state, StoreKey.data, { queryID: action.payload });
    }
    case StoreDataAction.setCurrentAnime: {
      return updateState(state, StoreKey.data, {
        currentAnime: action.payload,
      });
    }
    case StoreDataAction.setCurrentIndex: {
      return updateState(state, StoreKey.data, {
        currentIndex: {
          page: action.payload.page,
          item: action.payload.item,
        },
      });
    }
    case StoreDataAction.setRecommendationsArray: {
      return updateState(state, StoreKey.data, {
        recommendationsArray: [...action.payload],
      });
    }
    case StoreDataAction.setSingleAnime: {
      return updateState(state, StoreKey.data, {
        recommendationsArray: [...action.payload.recommendations],
        currentAnime: action.payload.anime,
      });
    }

    case StoreSearchAction.updateSearch: {
      console.warn(action.payload);
      return updateState(state, StoreKey.search, {
        [action.payload.key]: action.payload.value,
      });
    }

    case StoreUiAction.showModal: {
      return updateState(state, StoreKey.ui, { showModal: action.payload });
    }
    case StoreUiAction.showTrailer: {
      return updateState(state, StoreKey.ui, { showTrailer: action.payload });
    }
    case StoreUiAction.showError: {
      return updateState(state, StoreKey.ui, { showError: action.payload });
    }
    case StoreUiAction.showNav: {
      return updateState(state, StoreKey.ui, { showNav: action.payload });
    }
    case StoreUiAction.showLoading: {
      return updateState(state, StoreKey.ui, { showLoading: action.payload });
    }
    case StoreUiAction.handleError: {
      return {
        ...state,
        data: {
          ...state.data,
          queryResultsArray: null,
        },
        ui: {
          ...state.ui,
          showLoading: false,
          showError: true,
        },
      };
    }
    case StoreUiAction.handleLoading: {
      return {
        ...state,
        data: {
          ...state.data,
          currentAnime: null,
        },
        ui: {
          ...state.ui,
          showLoading: true,
          showError: false,
        },
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
