/* External dependencies */
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

/* Internal dependencies */
import * as roadSelectors from 'stores/selectors/roadSelectors';
import { requestGetRoad } from 'stores/actions/roadActions';
import Map from 'components/atoms/Map';
import Layout from 'components/Layout';
import BottomSheet from 'components/templates/BottomSheet';
import ImageDetail from 'components/modules/ImageDetail';
import { wrapper } from 'stores';

const Detail: NextPage = () => {
  const imgDetail = useSelector(roadSelectors.getImgDetail);
  const { isOpen, imgUrl } = imgDetail;

  /*  MEMO: (@Young-mason) 주석 부분은 server에서 처리 */
  // useEffect(() => {
  //   /* FIXME: (@danivelop) 테스트로 임시로 1을 넣음. 나중에 수정필요 */
  //   dispatch(requestGetRoad({ roadId: '1' }));
  // }, [dispatch])

  return (
    <Layout>
      <Wrapper>
        <MapWrapper>
          <Map />
        </MapWrapper>

        <BottomSheetWrapper>
          <BottomSheet />
        </BottomSheetWrapper>

        {isOpen && (
          <ImageDetailWrapper>
            <ImageDetail imgUrl={imgUrl} />
          </ImageDetailWrapper>
        )}
      </Wrapper>
    </Layout>
  );
};

Detail.getInitialProps = wrapper.getInitialPageProps((store) => (ctx) => {
  // SSR
  // 여기서 [id] 를 이용해 action dispatch 한 후 컴포넌트에서 Selector로 받아올 수 있음

  const roadId: any = ctx.query.id;
  store.dispatch(requestGetRoad({ roadId }));
});

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const MapWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

export const BottomSheetWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0eee5;
  z-index: 100;
`;

export const ImageDetailWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
`;
export default Detail;
