import {
	CHANGE_SIZE,
	SET_DELAY_REF,
	CHANGE_DIMENSIONS,
	SET_VISUALIZATION_ONGOING,
} from "../action-types";

const initialState = {
	size: 50,
	dimensions: {
		cols: 0,
		rows: 0,
	},
	delayRef: null,
	visualizationOngoing: false,
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

		default:
			return state;
	}
};
