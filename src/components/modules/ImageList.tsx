import React from 'react'
import styled from 'styled-components'
import ImageDetail from 'components/modules/ImageDetail'

interface ImageListProps {
  imgUrls: string[]
}

function ImageList({imgUrls}: ImageListProps) {

  // TODO 스와이프로 넘기는 애니메이션 추가
  // TODO 클릭시 ImageDetail 로 넘겨주기 (Redux 이용?)

  const handleClick = () => {
    // console.log('clicked')
  }

  return (
    <Container>
      {imgUrls.map((url, idx)=> 
        <ImageItem onClick={handleClick} key={url + idx} src={url}/>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 20px;
`

const ImageItem = styled.img`
width: 157px;
height: 128px;
border-radius: 8px;
cursor: pointer;
`



export default ImageList
