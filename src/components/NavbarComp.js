import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './NavbarComp.css';
import anime from 'animejs';

export default class NavbarComp extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpenFlower: false,
      dropdownOpenPlant: false,
      dropdownOpenWedding: false
    };

    
  }
  componentDidMount() {
    this.navbar = anime({
      targets: '.navbar',
      opacity:1,
      easing: 'linear'
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropdownOpenFlower = () => {
    this.setState({
      dropdownOpenFlower: !this.state.dropdownOpenFlower
    });
  }
  dropdownOpenPlant = () => {
    this.setState({
      dropdownOpenPlant: !this.state.dropdownOpenPlant
    });
  }
  dropdownOpenWedding = () => {
    this.setState({
      dropdownOpenWedding: !this.state.dropdownOpenWedding
    });
  }

  render() {
    var cursorPointer = 'cursor-pointer';
    return (
        <Navbar className={`bg-nav`} dark expand="md">
          <NavbarBrand className={`brand cursorPointer`} onClick={()=>{this.props.history.push("/"); this.setState({isOpen:false});}}>Partner Dashboard</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/"); this.setState({isOpen:false});}}>HOME</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/login"); this.setState({isOpen:false});}}>Login</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/About"); this.setState({isOpen:false});}}>ABOUT</NavLink>
              </NavItem>
              <Dropdown nav isOpen={this.state.dropdownOpenFlower} toggle={this.dropdownOpenFlower}>
                <DropdownToggle nav caret>
                  FLOWER
                </DropdownToggle> 
                <DropdownMenu>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/HandTide"); this.setState({isOpen:false});}}>HandTide</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/FlowerBox"); this.setState({isOpen:false});}}>Flower Box</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/FlowerBasket"); this.setState({isOpen:false});}}>Flower Basket</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/PreserveFlower"); this.setState({isOpen:false});}}>Preserve Flower</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/Event"); this.setState({isOpen:false});}}>Event</DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
              {/* <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/Flower"); this.setState({isOpen:false});}}>FLOWER</NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/Subscription"); this.setState({isOpen:false});}}>SUBSCRIPTION</NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/Plant"); this.setState({isOpen:false});}}>PLANT</NavLink>
              </NavItem> */}
              {/* <Dropdown nav isOpen={this.state.dropdownOpenPlant} toggle={this.dropdownOpenPlant}>
                <DropdownToggle nav caret>
                  PLANT
                </DropdownToggle> 
                <DropdownMenu>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/EasternOrchid"); this.setState({isOpen:false});}}>Eastern Orchid</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/WesternOrchid"); this.setState({isOpen:false});}}>Western Orchid</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/Planter"); this.setState({isOpen:false});}}>Planter</DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
              {/* <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/Wedding"); this.setState({isOpen:false});}}>WEDDING</NavLink>
              </NavItem> */}
              {/* <Dropdown nav isOpen={this.state.dropdownOpenWedding} toggle={this.dropdownOpenWedding}>
                <DropdownToggle nav caret>
                  WEDDING
                </DropdownToggle> 
                <DropdownMenu>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/WeddingBouquet"); this.setState({isOpen:false});}}>Wedding Bouquet</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/WeddingCar"); this.setState({isOpen:false});}}>Wedding Car</DropdownItem>
                  <DropdownItem className={cursorPointer} onClick={()=>{this.props.history.push("/HallDecoration"); this.setState({isOpen:false});}}>Hall Decoration</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/Academy"); this.setState({isOpen:false});}}>ACADEMY</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/Floralart"); this.setState({isOpen:false});}}>FLORALART</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  className={cursorPointer} onClick={()=>{this.props.history.push("/Contact"); this.setState({isOpen:false});}}>CONTACT</NavLink>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}