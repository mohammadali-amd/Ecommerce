import styled, { css } from "styled-components"
import { primary } from "@/lib/colors"

export const ButtonStyle = css`
   border: 0;
   padding: 5px 15px;
   border-radius: 5px;
   display: inline-flex;
   align-items: center;
   text-decoration: none;
   svg {
      height: 16px;
      margin-right: 5px;
   }
   ${props => props.block && css`
      display: block;
      width: 100%;
   `}
   ${props => props.white && !props.outline && css`
      background-color: #fff;
      color: #000;
   `}
   ${props => props.white && props.outline && css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
   `}
   ${props => props.black && !props.outline && css`
      background-color: #000;
      color: #fff;
   `}
   ${props => props.black && props.outline && css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
   `}
   ${props => props.primary && !props.outline && css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
   `}
   ${props => props.primary && props.outline && css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
   `}
   ${props => props.size === 'lg' && css`
      font-size: 1%.;
      padding: 10px 20px;
      svg {
      height: 20px;
      }
   `}
   
`;

const StyledButton = styled.button`
   ${ButtonStyle}
`;

const Button = ({ children, ...props }) => {
   return (
      <StyledButton {...props}>{children}</StyledButton>
   )
}

export default Button;