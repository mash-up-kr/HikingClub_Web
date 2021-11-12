import { FC } from 'react';
import styled from 'styled-components';
import ReactionChip from 'components/atoms/ReactionChip';

interface ReactionBoxProps {
  // likeCount: number;
  // isReactedLike: boolean;
  // bestCount: number;
  // isReactedBest: boolean;
  // surprisedCount: number;
  // isReactedSurprised: boolean;
  // badCount: number;
  // isReactedBad: boolean;
}

const ReactionBox: FC<ReactionBoxProps> = () => {
  // const {
  //   likeCount,
  //   isReactedLike,
  //   bestCount,
  //   isReactedBest,
  //   surprisedCount,
  //   isReactedSurprised,
  //   badCount,
  //   isReactedBad,
  // } = props;
  return (
    <Container>
      <div className="reactionChipWrapper">
        <ReactionChip
          image={'/images/icon_emoji_thumbsUp_16.png'}
          count={1}
          isReacted={true}
          handleClick={() => {}}
        />
      </div>
      <div className="reactionChipWrapper">
        <ReactionChip
          image={'/images/icon_emoji_heartEyes_16.png'}
          count={1}
          isReacted={false}
          handleClick={() => {}}
        />
      </div>
      <div className="reactionChipWrapper">
        <ReactionChip
          image={'/images/icon_emoji_surprised_16.png'}
          count={1}
          isReacted={false}
          handleClick={() => {}}
        />
      </div>
      <div className="reactionChipWrapper">
        <ReactionChip
          image={'/images/icon_emoji_disappointed_16.png'}
          count={1}
          isReacted={true}
          handleClick={() => {}}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 8px;
  display: flex;
  .reactionChipWrapper:nth-child(n + 2) {
    margin-left: 10px;
  }
`;

export default ReactionBox;
