import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  gap: 10px;
`;

export const LanguageButton = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? '#1abc9c' : 'transparent')};
  color: #fff;
  border: none;
  border-radius: 3px;
`;
