import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 90vw;
    padding: 20px;
    z-index: 123;
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.582);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
`

export default function InfoBox({children}) {

  return (
    <Container>
        {children}
    </Container>
  )
}
