interface Action<T extends string, P> {
  type: T;
  payload: P;
  meta?: any;
}

type ActionFunc<T extends string, P> = (
  payload?: P,
  meta?: any
) => Action<T, P>;

export function actionCreator<T extends string, P = {}>(
  actionType: T
): ActionFunc<T, P> {
  return (payload: any = {}, meta?: any) => ({
    type: actionType,
    payload,
    meta,
  });
}
