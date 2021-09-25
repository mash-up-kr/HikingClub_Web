export enum ActionTypes {
  TEST = "TEST",
}

export const testAction = () => ({
  type: ActionTypes.TEST,
});
