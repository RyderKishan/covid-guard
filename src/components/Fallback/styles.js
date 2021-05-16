import styled from 'styled-components';

export const FallBackContainer = styled.article`
  margin: ${({ theme }) => theme.spacing(1)}rem;
  & > div.code {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
    line-height: ${({ theme }) => theme.typography.h2.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.h2.letterSpacing};
    color: ${({ theme }) => theme.palette.text.primary};
  }
  & > div.text {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
    line-height: ${({ theme }) => theme.typography.h5.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.h5.letterSpacing};
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

export const Code = styled.div``;
