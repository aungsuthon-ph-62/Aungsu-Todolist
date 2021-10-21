import React from 'react';
import styled from 'styled-components';

export default function Empty() {
  return (
    <ComponentContainer>
      <EmptyImage source={require('../assets/images/saturn.png')} />
      <EmptyText>Add Task</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 650px;
`;

const EmptyImage = styled.Image`
  width: 400px;
  height: 400px;
`;

const EmptyText = styled.Text`
  color: white;
  font-family: Poppins-Bold;
  font-size: 30px;
`;
