import styled from 'styled-components'

const MButton = styled.button`
    outline: none;
    position: relative;
    background-color: var(--c-main1);  
    border: none;
    color: rgba(255, 255, 255, 0.952);
    border-radius: 5px;
    font-size: 1.3rem;
    font-weight: 500;
    width: 100%;
    line-height: 10vw;
    padding: 10px 10px;

  &:hover{
    transform: scale(.95);
  }
`

export default function Button({ onClick, children}) {

  return (
        <MButton onClick={onClick}>
            {children}
        </MButton>
  )
}
