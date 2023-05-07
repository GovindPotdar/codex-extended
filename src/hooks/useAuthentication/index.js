import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function useAuthentication() {
  const navigate = useNavigate()
  
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      console.log('Sign-out successful')
    }).catch((e) => {
      console.log(e.message)
    });
  }

  const handleSignIn = (data)=>{
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      console.log('User signed in')
    })
    .catch((e) => {
      alert(e.message)
    });
  }

  const handleSignUp = (data)=>{
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userData)=>{
      const user = userData.user
      setDoc(doc(db, 'users', user.uid),{
        email: user.email,
        isAdmin: true
      })
      .then((dt)=>{
        console.log('user created')
        // navigate('/')
      })
      .catch((e)=>{
        alert(e.message)
      })
    })
    .catch((e)=>{
      alert(e.message)
    })
  }
  return {handleSignUp, handleSignIn, handleSignOut}
}

export default useAuthentication
