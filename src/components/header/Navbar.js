import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/ContextProvider'
import { IconButton, Drawer,List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';
const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext)
  console.log(account);

const history=useNavigate();

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text,setText]=useState("");
  console.log(text);
  const [liopen,setLiopen]=useState(true);

  const { products } = useSelector(state => state.getproductsdata);
  const [dropen, setDropen] = useState(false);
  const getdetailvaliduser = async () => {
    const res = await fetch('/validuser', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const data = await res.json();
    // console.log(data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };


  const logoutuser = async () => {
    const res2 = await fetch('/logout', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const data2 = await res2.json();
    // console.log(data);
    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      // alert('logout');
      toast.success("Logout Successfully done 😃!", {
        position: "top-center"
    });
      setAccount(false);
      history('/');
    }
  };

const getText=(iteams)=>{
  setText(iteams);
  setLiopen(false);
}
  const handleopen = () => {
    setDropen(true);
  }

  const handledrclose = () => {
    setDropen(false);
  }

  useEffect(() => {
    getdetailvaliduser();
  }, [])

  return (
    <>
      <div>
        <header>
          <nav>
            <div className="left">

              <IconButton className='hamburgur' onClick={handleopen}>
                <MenuIcon style={{ color: "#fff" }} />
              </IconButton>

              <Drawer open={dropen} onClose={handledrclose}>
                <Rightheader Logclose={handledrclose} Logoutuser={logoutuser}/>
              </Drawer>

              <div className="navlogo">
                <NavLink to='/'><img src="./Amazon_img.png" alt="" /></NavLink>
              </div>
              <div className="nav_searchbaar">
                <input type='text' name=''
                onChange={(e)=>getText(e.target.value)}
                placeholder='Search your products'
                 id='' />
                <div className='search_icon'>
                  <SearchIcon id="search" />
                </div>
                {/* search filter */}
                {
                  text &&
                  <List className='extrasearch' hidden={liopen}>
                  {
                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                      <ListItem>
                      <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
                      {product.title.longTitle}

                      </NavLink>
                        
                      </ListItem>

                    ))

                  }
                  

                  </List>
                }
              </div>
            </div>
            <div className='right'>
              <div className='nav_btn'>
                {/* <a href="#">Sign in</a> */}
                <NavLink to='/login'>Sign In</NavLink>
              </div>
              <div className='cart_btn'>
                {/* <Badge badgeContent={4} color="primary"> */}
                {/* <Badge badgeContent={account.carts.length} color="primary"> */}
                {
                  account ? <NavLink to='/buynow'>
                    <Badge badgeContent={account.carts.length} color="primary">
                      <ShoppingCartIcon id="icon" />
                    </Badge>
                  </NavLink> : <NavLink to="/login">
                    <Badge badgeContent={0} color="primary">
                      <ShoppingCartIcon id="icon" />
                    </Badge>
                  </NavLink>
                }
                {/* <NavLink to='/buynow'> */}
                {/* <Badge badgeContent={account.carts?account.carts.length:0} color="primary">

                <ShoppingCartIcon id="icon" />
              </Badge>
              </NavLink> */}
              <ToastContainer/>
                <p>Cart</p>
              </div>
              {
                account ? <Avatar className='avtar2'
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> :
                  <Avatar className='avtar'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}></Avatar>
              }
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                
                <MenuItem onClick={handleClose}>My account</MenuItem>
                {
                  account?<MenuItem onClick={handleClose} onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }}/>Logout</MenuItem>:""
                }
                
              </Menu>
              {/* <Avatar className='avtar'>H</Avatar> */}
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Navbar
