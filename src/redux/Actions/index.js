import {
	CHANGE_SIZE,
	SET_DELAY_REF,
	CHANGE_DIMENSIONS,
	SET_VISUALIZATION_ONGOING,
} from "../action-types";

export const doChangeSize = (size) => ({
	type: CHANGE_SIZE,
	payload: size,
});

export const doSetDelayRef = (ref) => ({
	type: SET_DELAY_REF,
	payload: ref,
});

export const doChangeDimensions = (cols, rows) => ({
	type: CHANGE_DIMENSIONS,
	payload: { cols, rows },
});

export const doSetVisualizationOngoing = (bool) => ({
	type: SET_VISUALIZATION_ONGOING,
	payload: bool,
});
