import React from 'react';
import { useDialog } from '../context/context';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { handleClickOpen } = useDialog();

  return (
    <nav style={{ height: '77px', width: '100%', borderBottom: "1px solid black" }}>
      <div style={{ width: '80%', height: '100%', margin: "auto", display: 'flex', justifyContent: 'space-between' }} className='navs'>
        <Link to="/">
          <div style={{ height: '100%', width: 'mx-auto', display: 'flex', alignItems: 'center' }}>
            <h2 variant='h2' style={{ color: '#191919', fontSize: '30px', fontWeight: '700', letterSpacing: '-1px', marginLeft: '-4px' }}>Medium</h2>
          </div>
        </Link>

        <div style={{ width: 'mx-auto', height: '100%', display: 'flex', alignItems: 'center', padding: '1px', gap: '23px' }}>
          <Link to='/about'>
            <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#191919', cursor: 'pointer' }} className='nav'>Our story</h2>
          </Link>
          <Link to='#'>
            <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#191919', cursor: 'pointer' }} className='nav'>Membership</h2>
          </Link>
          <h2 onClick={handleClickOpen} style={{ fontSize: '14px', fontWeight: '500', color: '#191919', cursor: 'pointer' }} className='nav'>Write</h2>

          <h2 onClick={handleClickOpen} style={{ fontSize: '14px', fontWeight: '500', color: '#191919', cursor: 'pointer' }} className='nav1'>Sign in</h2>
          <button onClick={handleClickOpen} style={{ backgroundColor: '#191919', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#FFFFFF', borderRadius: "40px", padding: '9px', paddingLeft: '10px', width: "100px" }}>Get started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
