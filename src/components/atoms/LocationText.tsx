import React, {FC} from 'react';
import styled, {css} from 'styled-components'
import LocationIcon from '@src/assets/images/location.png';
import Image from 'next/image'


const LocationStyle = css`
    font-size: 14px;
    color:#5a5a5f;
    font-weight: 400;
`

const DistanceStyle = css`
    font-size: 14px;
    color:#2c7a50;
    font-weight: 700;
`

interface StyleProps {
    styleType?: 'location' | 'distance'
}

interface LocationTextProps extends StyleProps {
    text?: string
}

const StyleView = styled.div<StyleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyleText = styled.div<StyleProps>`
    margin: 0 0 0 7px;
    ${(props) => props.styleType === 'location'? LocationStyle : DistanceStyle}
`

const LocationText : FC<LocationTextProps> = (props) => {
    const {
        styleType = 'location',
        text = '예시 텍스트'
    } = props

    return (
        <StyleView>
            <Image src={LocationIcon} alt="위치" className='locationIcon'/>
            <StyleText styleType={styleType}>
                {text}
            </StyleText>
        </StyleView>
    )
}

export default LocationText;