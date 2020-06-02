import React, { useEffect, useRef } from 'react';
import logo from './images/logo.svg';
import bgshadow from './images/bg-shadow.svg';
import profilepic from './images/profilepic.jpg';
import './App.css';
import ScrollReveal from 'scrollreveal';
import { navLinks, scrollRevealConfig } from './config';
import styled from 'styled-components';


const throttle = (func, wait = 400) => {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
};

const DayNightToggle = styled.label`
$night: #171C28;
$day: #fff;
$nightBtn: #fff;
$dayBtn: #5628EE;

  cursor: pointer;
  input {
      display: none;
      & + div {
          border-radius: 50%;
          width: 36px;
          height: 36px;
          position: relative;
          box-shadow: inset 16px -16px 0 0 #595959;
          transform: scale(1) rotate(-2deg);
          transition: box-shadow .5s ease 0s, transform .4s ease .1s;
          &:before {
              content: '';
              width: inherit;
              height: inherit;
              border-radius: inherit;
              position: absolute;
              left: 0;
              top: 0;
              transition: background .3s ease;
          }
          &:after {
              content: '';
              width: 8px;
              height: 8px;
              border-radius: 50%;
              margin: -4px 0 0 -4px;
              position: absolute;
              top: 50%;
              left: 50%;
              box-shadow: 0 -23px 0 #ffcf3f, 0 23px 0 #ffcf3f, 23px 0 0 #ffcf3f, -23px 0 0 #ffcf3f, 15px 15px 0 #ffcf3f, -15px 15px 0 #ffcf3f, 15px -15px 0 #ffcf3f, -15px -15px 0 #ffcf3f;
              transform: scale(0);
              transition: all .3s ease;
          }
      }
      &:checked + div {
          box-shadow: inset 32px -32px 0 0 #595959;
          transform: scale(.5) rotate(0deg);
          transition: transform .3s ease .1s, box-shadow .2s ease 0s;
          &:before {
              background: #ffcf3f;
              transition: background .3s ease .1s;
          }
          &:after {
              transform: scale(1.5);
              transition: transform .5s ease .15s;
          }
      }
  }
`;

const BGShadow = () => <img className="bg-shadow" src={bgshadow} alt="bg shadow" />

const Logo = () => <img width="250px" src={logo} alt="PROWE PC Logo" />;

const NavContactBtn = (props) => <li><button className={"nav-button nav-" + props.type}>{props.children}</button></li>;

const NavItems = () => (

  <>
    <DayNightToggle >
      <input type="checkbox"/>
      <div></div>
    </DayNightToggle>

    <ul className="nav-items">
      {
        navLinks.map(item => <li><a href={item.url}>{item.name}</a></li>)
      }
      <NavContactBtn type="phone" children={"289-688-8400"} />
      <NavContactBtn type="contact" children={"Contact Me!"} />
    </ul></>
)



const StyledNav = styled.header`
  z-index: 10;
  height: 100px;
  position: fixed;
  background-color: #F8F8F8;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  height: ${props => (props.scrollDirection === 'none' ? "100px" : "70px")};
  box-shadow: ${props =>
    props.scrollDirection === 'up' ? `0 10px 30px -10px rgba(0, 0, 0, 0.3)` : 'none'};
  transform: translateY(
    ${props => (props.scrollDirection === 'down' ? "-70px" : '0px')}
  );
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Home = () => {
  const revealContainer = useRef(null);
  useEffect(() => ScrollReveal().reveal(revealContainer.current, scrollRevealConfig()), []);

  return (<>
    <section className="home" ref={revealContainer}>
      <div className="home-content">
        <h1>Computer Building & Repair <span role="img" aria-label="wrench emoji">🔧</span></h1>
        <h2>Old PCs, new PCs, I can build and fix em all.</h2>
        <h3>Just a computer engineering student putting his skills to use. Reach out for any computer needs!</h3>
      </div>
    </section>
  </>);
}

class NavBar extends React.Component {
  state = {
    scrollDirection: 'none',
    lastScrollTop: 0,
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({ isMounted: true }, () => {
          window.addEventListener('scroll', () => throttle(this.handleScroll()));
        }),
      100,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll());
  }


  handleScroll = () => {
    const { scrollDirection, lastScrollTop } = this.state;
    const fromTop = window.scrollY;

    // Make sure they scroll more than DELTA
    if (Math.abs(lastScrollTop - fromTop) <= 5) {
      return;
    }

    if (fromTop < 5) {
      this.setState({ scrollDirection: 'none' });
    } else if (fromTop > lastScrollTop && fromTop > 100) {
      if (scrollDirection !== 'down') {
        this.setState({ scrollDirection: 'down' });
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      if (scrollDirection !== 'up') {
        this.setState({ scrollDirection: 'up' });
      }
    }

    this.setState({ lastScrollTop: fromTop });
  };


  render() {
    const { scrollDirection } = this.state;



    return (<>

      <StyledNav scrollDirection={scrollDirection}>
        <Logo />
        <NavItems />
      </StyledNav> </>
    );
  }
}


const About = () => {
  const revealContainer = useRef(null);
  useEffect(() => ScrollReveal().reveal(revealContainer.current, scrollRevealConfig()), []);

  return (<>
    <section id="about" className="about" ref={revealContainer}>
      <div className="about-content">
        <h1>About Me</h1>
        <div className="underline blue"></div>
        <div className="about-info">
          <div className="about-text">
            <h2>Hi <span role="img" aria-label="wave emoji">👋</span> I’m Parker Rowe!</h2>
            <p>I’m a friendly, hardworking student in my 3rd year of Computer Engineering @ Queen’s University.<br /><br />
I’ve been building and fixing computers for friends and family since I was in grade 7, thought it was time to offer help to others. </p>
          </div>
          <img className="about-pic" src={profilepic} alt="profile pic" />
        </div>

      </div>
    </section>
  </>);
}

const Testimonials = () => {
  const revealContainer = useRef(null);
  useEffect(() => ScrollReveal().reveal(revealContainer.current, scrollRevealConfig()), []);

  return (<>
    <section id="testimonials" className="testimonials" ref={revealContainer}>
      <div className="testimonials-content">
        <h1>Testimonials</h1>
        <div className="underline red"></div>
      </div>
    </section>
  </>);
}

function App() {
  return (<>
    <BGShadow />
    <NavBar />
    <Home />
    <About />
    <Testimonials />
  </>
  );
}

export default App;
