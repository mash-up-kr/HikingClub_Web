/* External dependencies */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Internal dependencies */
import { requestGetRoad } from 'stores/actions/roadActions';
import { setRoad } from 'stores/actions/editActions';
import { getRoad } from 'stores/selectors/roadSelectors';
import Layout from 'components/Layout';
import MakeRoad from 'components/templates/MakeRoad';

function Edit() {
  const dispatch = useDispatch();
  const road = useSelector(getRoad);

  useEffect(() => {
    dispatch(requestGetRoad({ roadId: '142' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setRoad({ road }));
  }, [dispatch, road]);

  return (
    <Layout>
      <MakeRoad />
    </Layout>
  );
}

export default Edit;
