import {adminApp} from '../../../firebase.js';

function signOutAll(){
  adminApp.auth().revokeRefreshTokens(uid)
    .then(() => {
      return admin.auth().getUser(uid);
    })
    .then((userRecord) => {
      return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
    })
    .then((timestamp) => {
      //return valid response to ios app to continue the user's login process
  });
 return (
    <>
    </>
 )
}