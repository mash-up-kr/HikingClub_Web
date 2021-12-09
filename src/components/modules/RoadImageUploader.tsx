import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useDispatch, useSelector } from 'react-redux';

import { uploadImage } from 'stores/apis/editAPI';
import { addImage, removeImage } from 'stores/actions/editActions';
import { getImages } from 'stores/selectors/editSelectors';

function RoadImageUploader() {
  const imgUrls = useSelector(getImages).toArray();
  const [images, setImages] = useState<ImageListType>(
    imgUrls.length ? imgUrls.map((item) => ({ data_url: item })) : []
  );

  const dispatch = useDispatch();

  const maxNumber = 5;

  const handleChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    const i = (addUpdateIndex && addUpdateIndex[0]) || 0;
    // Add Image
    if (images.length < imageList.length) {
      const image = imageList[i];
      if (image.file) {
        const formData = new FormData();
        formData.append('files', image.file);

        const res = await uploadImage(formData);

        console.log(res);

        dispatch(addImage({ image: '1231231' }));
      }
    }

    setImages(imageList);
  };
  return (
    <Container>
      <Title>사진 등록</Title>
      <ImageUploading
        multiple
        value={images}
        onChange={handleChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageRemove }) => (
          // write your building UI

          <UploadImageWrapper>
            <ImageList>
              <AddImage onClick={onImageUpload}>
                <CameraIcon src="/icons/icon_camera.png" alt="camera_icon" />
                <Counts>
                  {imageList.length}/{maxNumber}
                </Counts>
              </AddImage>
              {imageList.map((image, index) => (
                <ImageItem key={index}>
                  <Image src={image.data_url} alt="" />

                  <CloseIconWrapper
                    onClick={() => {
                      onImageRemove(index);
                      dispatch(removeImage({ index }));
                    }}
                  >
                    <CloseIcon src="/images/close-icon.png" />
                  </CloseIconWrapper>
                </ImageItem>
              ))}
            </ImageList>
          </UploadImageWrapper>
        )}
      </ImageUploading>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 36px;
  overflow-x: auto;
`;

const UploadImageWrapper = styled.div`
  display: flex;
`;

const AddImage = styled.div`
  width: 116px;
  height: 96px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 2px solid #e4e4e4;
  border-radius: 11px;

  cursor: pointer;
`;

const CameraIcon = styled.img`
  width: 32px;
`;

const Counts = styled.p`
  color: #a5a5a5;
  font-weight: 600;
  font-size: 18px;
`;

const ImageList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ImageItem = styled.div`
  position: relative;
  width: 116px;
  height: 96px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  border: 2px solid #e4e4e4;
  border-radius: 11px;
`;

const CloseIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  background-color: #000;

  position: absolute;
  right: -5px;
  top: -5px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 80%;
`;

const Title = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

export default RoadImageUploader;
