import styled from 'styled-components';

export const StyledImage = styled.img`
    height: 450px;

    object-fit: cover;

    @media screen and (max-width: 767px) {
        max-height: 200px;
    }

`;
