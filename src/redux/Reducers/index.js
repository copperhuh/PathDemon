import {
	CHANGE_SIZE,
	SET_DELAY_REF,
	CHANGE_DIMENSIONS,
	SET_VISUALIZATION_ONGOING,
	SET_PATH_VISIBLE,
	SET_GENERATING,
	SET_SKIP_REF,
	SET_RESET,
} from "../action-types";

const initialState = {
	size: 50,
	dimensions: {
		cols: 0,
		rows: 0,
	},
	delayRef: null,
	visualizationOngoing: false,
	generating: "maze",
	pathVisible: false,
	skipRef: false,
	reset: false,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_SIZE:
			return { ...state, size: action.payload };
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
		case SET_SKIP_REF:
			return {
				...state,
				skipRef: action.payload,
			};
		case SET_RESET:
			return {
				...state,
				reset: action.payload,
			};

		default:
			return state;
	}
};
