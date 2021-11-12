/* External dependencies */
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';

/* Internal dependencies */
import { wrapper } from 'stores';
import { getRoad } from 'stores/selectors/roadSelectors';
import { requestGetRoad } from 'stores/actions/roadActions';
import { setRoad } from 'stores/actions/editActions';
import Layout from 'components/Layout';
import MakeRoad from 'components/templates/MakeRoad';

const Edit: NextPage = () => {
  const dispatch = useDispatch();
  const road = useSelector(getRoad);

  /* MEMO: (@Young-mason) 주석 부분은 server에서 처리 */
  // useEffect(() => {
  //   dispatch(requestGetRoad({ roadId: '142' }));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(setRoad({ road }));
  }, [dispatch, road]);

  return (
    <Layout>
      <MakeRoad />
    </Layout>
  );
};

Edit.getInitialProps = wrapper.getInitialPageProps((store) => (ctx) => {
  // SSR
  // 여기서 [id] 를 이용해 action dispatch 한 후 컴포넌트에서 Selector로 받아올 수 있음
  const roadId: any = ctx.query.id;
  store.dispatch(requestGetRoad({ roadId }));
});

export default Edit;
