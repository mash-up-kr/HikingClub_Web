import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface RoadImageUploaderProps {
  roadImages: any; // MEMO (@Young-mason) 최초 렌더링시 string배열(url)로 이미지를 그려주고, 이후 업데이트시 FormData로 변경해주고 있음. 타입지정은 어떻게?
  onChangeRoadImages: (formData: FormData) => void;
}

function RoadImageUploader({
  roadImages,
  onChangeRoadImages,
}: RoadImageUploaderProps) {
  const initialImages = useMemo(
    () =>
      roadImages.length
        ? roadImages.map((imgUrl: string) => ({ data_url: imgUrl }))
        : [],
    []
  );

  const [images, setImages] = useState<ImageListType>(initialImages);

  const maxNumber = 5;

  const onChange = (imageList: ImageListType) => {
    const formData = new FormData();

    imageList.forEach((img) => {
      if (img.file) {
        const blob = new Blob([img.file], { type: 'image' });
        formData.append('file', blob, img.name);
      }
    });

    setImages(imageList);
    onChangeRoadImages(formData);
  };

  return (
    <Container>
      <Title>사진 등록</Title>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
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

                  <CloseIconWrapper onClick={() => onImageRemove(index)}>
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
  margin-top: 20px;
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
