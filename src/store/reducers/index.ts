import { AnyAction } from "redux";
import { APIData } from "../../types/APIData";

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
  recommendationsArray: APIData[];
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

type StoreKey = "data" | "ui" | "search";

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

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "data/updateData": {
      return updateState(state, "data", {
        queryResultArray: action.payload.data,
        queryResultSingleItem: action.payload.data[action.payload.item],
        queryID: action.payload.data[action.payload.item].mal_id,
      });
    }
    case "data/updateQueryResultArray": {
      return updateState(state, "data", {
        queryResultArray: [...action.payload],
      });
    }
    case "data/updateQueryResultSingleItem": {
      return updateState(state, "data", {
        queryResultSingleItem: action.payload,
      });
    }
    case "data/updateQuery": {
      return updateState(state, "data", { query: action.payload });
    }
    case "data/updateQueryID": {
      return updateState(state, "data", { queryID: action.payload });
    }
    case "data/setCurrentAnime": {
      return updateState(state, "data", {
        currentAnime: action.payload,
      });
    }
    case "data/setCurrentIndex": {
      return updateState(state, "data", {
        currentIndex: {
          page: action.payload.page,
          item: action.payload.item,
        },
      });
    }
    case "data/setRecommendationsArray": {
      return updateState(state, "data", {
        recommendationsArray: [...action.payload],
      });
    }
    case "data/setSingleAnime": {
      return updateState(state, "data", {
        recommendationsArray: [...action.payload.recommendations],
        currentAnime: action.payload.anime,
      });
    }

    //search
    case "search/updateSearch": {
      console.warn(action.payload);
      return updateState(state, "search", {
        [action.payload.key]: action.payload.value,
      });
    }

    //ui
    case "ui/showModal": {
      return updateState(state, "ui", { showModal: action.payload });
    }
    case "ui/showTrailer": {
      return updateState(state, "ui", { showTrailer: action.payload });
    }
    case "ui/showError": {
      return updateState(state, "ui", { showError: action.payload });
    }
    case "ui/showNav": {
      return updateState(state, "ui", { showNav: action.payload });
    }
    case "ui/showLoading": {
      return updateState(state, "ui", { showLoading: action.payload });
    }
    case "ui/handleError": {
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
    case "ui/handleLoading": {
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
