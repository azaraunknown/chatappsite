import React from 'react'
import { Button } from '@material-ui/core'
import {auth} from '../firebase.js'
function SignOut() {
    
  return (
    <div>
        <Button onClick={() => {auth.signOut()}}>Sign Out</Button>


    </div>
  )
}

export default SignOut