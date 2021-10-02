import React from 'react'
import styled from 'styled-components'

function TextArea() {
  const defaultValue = '이길은 어저구 어저구 저저주가ㅓ아어뫄ㅘ하ㅓ다하ㅓㅣㅁ;ㅏㅇ안영하네셔아ㅓ 이길은 어저구 어저구 저저주가ㅓ아어뫄ㅘ하ㅓ다하ㅓㅣㅁ;ㅏㅇ안영하네셔아ㅓ'


  // TODO handleChange붙이기
  // height 어떻게 조절? 
  // 작성자 이름 붙이기 

  
  return (
    <StyledTextArea value={defaultValue}/>
  )
}

const StyledTextArea = styled.textarea`
  width: 100%;
  background: #F7F7FB;
  padding: 14px;
  height: 161px;
  border-radius: 8px;

  :focus {
    outline: none;
  }
` 

export default TextArea
