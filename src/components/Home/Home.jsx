import React from 'react'
import Navbar from './Header/Navbar'
import Footer from './Header/Footer'
import SimpleDialog from './Header/Login/SignUp'
import { useDialog } from './context/context';

export default function Home() {
    const { handleClickOpen } = useDialog();

    return (
        <header style={{ height: '100vh', width: '100%', backgroundColor: "#F7F4ED" }}>
            {/* <DialogProvider> */} 
                <Navbar /> 
                <SimpleDialog />
            {/* </DialogProvider> */}
            <section style={{ height: '80.7%', width: '100%', borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <div className='ha' style={{ width: '70%', marginTop: '145px', padding: '1px', marginLeft: "10%", backgroundColor: "#F7F4ED" }}>
                    <h2 style={{ fontSize: '135px', fontWeight: '400', color: "#242424", lineHeight: '100px', fontFamily: "gt-super  Georgia Cambria Times New Roman Times serif ", letterSpacing: '-6px', cursor: 'default' }}>Human <br /> stories & ideas</h2>
                    <p style={{ fontSize: '22px', fontWeight: '400', color: '#242424', marginTop: '43px', cursor: "default" }}>A place to read, write, and deepen your understanding</p>
                    <button onClick={handleClickOpen} style={{ width: '195px', height: '45px', borderRadius: '40px', fontSize: '20px', fontWeight: '500', backgroundColor: "#191919", color: 'white', marginTop: '45px' }}>Start reading</button>
                </div>
                <div className='headimg' style={{ height: '100%', width: '30.9%', padding: '1px', display: 'flex', justifyContent: 'flex-end', overflow: 'hidden', position: "absolute", top: "0", right: "0" }}>
                    <img style={{ height: '100%', marginTop: '18px' }} src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" alt="" />
                </div>
            </section>
            <Footer />

        </header>
    )
}
