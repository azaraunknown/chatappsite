// File by: Griffin
// Liam did things for css
import React from 'react'
import { Button } from '@material-ui/core'
import {auth} from '../firebase.js'
import '../App.css';

function SignOut() {
  return (
    <div className='align_left'>
        <Button variant="contained" color="secondary" onClick={() => {auth.signOut()}}>Sign Out</Button>
    </div>
  )
}

export default SignOut