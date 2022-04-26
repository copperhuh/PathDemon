import {
	CHANGE_SIZE,
	SET_DELAY_REF,
	CHANGE_DIMENSIONS,
	SET_VISUALIZATION_ONGOING,
	SET_PATH_VISIBLE,
	SET_GENERATING,
	SET_SKIP,
	SET_RESET,
	CHANGE_MAZE_TYPE,
	CHANGE_SEARCH_TYPE,
	CHANGE_DELAY,
} from "../action-types";

let initialSize;

switch (true) {
	case window.width > 1000: {
		initialSize = 35;
		break;
	}
	case window.width > 550: {
		initialSize = 25;
		break;
	}
	case window.width > 200: {
		initialSize = 20;
		break;
	}
	default:
		initialSize = 35;
}

const initialState = {
	size: initialSize,
	delay: 50,
	dimensions: {
		cols: 0,
		rows: 0,
	},
	delayRef: null,
	visualizationOngoing: false,
	generating: "maze",
	pathVisible: false,
	skip: false,
	reset: false,
	mazeType: "DFS",
	searchType: "A*",
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_SIZE:
			return { ...state, size: action.payload };
		case CHANGE_DELAY:
			return { ...state, delay: action.payload };
		case SET_DELAY_REF:
			return { ...state, delayRef: action.payload };
		case SET_VISUALIZATION_ONGOING:
			return { ...state, visualizationOngoing: action.payload };
		case CHANGE_DIMENSIONS:
			return {
				...state,
				dimensions: {
					cols: action.payload.cols,
					rows: action.payload.rows,
				},
			};
		case SET_GENERATING:
			return {
				...state,
				generating: action.payload,
			};
		case SET_PATH_VISIBLE:
			return {
				...state,
				pathVisible: action.payload,
			};
		case SET_SKIP:
			return {
				...state,
				skip: action.payload,
			};
		case SET_RESET:
			return {
				...state,
				reset: action.payload,
			};
		case CHANGE_MAZE_TYPE:
			return {
				...state,
				mazeType: action.payload,
			};
		case CHANGE_SEARCH_TYPE:
			return {
				...state,
				searchType: action.payload,
			};

		default:
			return state;
	}
};
