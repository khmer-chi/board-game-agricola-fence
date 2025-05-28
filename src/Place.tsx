import { squareBase } from './config';

export const Place = ({ i, j }: { i: number; j: number }) => {
  const placeKey = i + '-' + j + '-place';
  return (
    <layoutContainer
      key={placeKey}
      layout={{ width: squareBase, height: squareBase, backgroundColor: '#00ff00' }}
      onClick={(e: Event) => {
        e.stopPropagation();
        console.log(i + '-' + j + '-fenceH');
        console.log(i + '-' + (j + 1) + '-fenceH');
        console.log(i + '-' + j + '-fenceV');
        console.log(i + '-' + (j + 1) + '-fenceV');
        console.log(placeKey);
      }}
    >
      <layoutText text={placeKey} />
    </layoutContainer>
  );
};
