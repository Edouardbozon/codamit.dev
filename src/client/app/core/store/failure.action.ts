export const FAILURE = '[ALL] FAILURE';

export const failure = (error: any) => ({ type: FAILURE, payload: error });
