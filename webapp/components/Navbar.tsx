import Link from 'next/link'
import { MdHome, MdExplore, MdTrendingUp, MdSettings } from 'react-icons/md'
import { useRouter } from 'next/router'

import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #161616;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
`

const NavField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: .8rem;
    padding: 5px 0;
    color: ${( {active}:{active:boolean} ) => active ? `#fff` : `#777` };
    font-weight: 300;

    & > svg{
      height: 30px;
      width: 30px;
      color: ${( {active}:{active:boolean} ) => active ? `#fff` : `transparent` };
      stroke: ${( {active}:{active:boolean} ) => active ? `#fff` : `#777` };
      stroke-width: 1px;
    }
`

export default function Navbar() {

  const router = useRouter();

  return (
    <Nav>
        <Link href='/home' >
          <NavField active={router.pathname ==='/home'}>
              <MdHome /> Home
          </NavField>
        </Link>
        <Link href='/map' >
          <NavField active={router.pathname ==='/map'}>
            <MdExplore /> Map
          </NavField>
        </Link>
        <Link href='/ranking' >
          <NavField active={router.pathname ==='/ranking'}>
            <MdTrendingUp/>Ranking
          </NavField>
        </Link>
        <Link href='/settings' >
          <NavField active={router.pathname ==='/settings'}>
            <MdSettings/> Settings
          </NavField>
        </Link>
    </Nav>
  )
}
