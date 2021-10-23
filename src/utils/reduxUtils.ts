interface Action<T extends string, P = any | undefined> {
  type: T;
  payload?: P;
  meta?: any;
}

type ActionFunc<T extends string, P = any | undefined> = (
  payload?: P,
  meta?: any
) => Action<T, P>;

export function actionCreator<T extends string, P = any | undefined>(
  actionType: T
): ActionFunc<T, P> {
  return (payload?: P, meta: any = {}) => ({
    type: actionType,
    payload,
    meta,
  });
}
