import react, {useState, useEffect} from 'react'
import './login.css'
import fire from './fire'

const login = () => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(""); 
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    const handleLogin = () =>{
        fire
        .auth().signInWithEmailAndPassword(email,password)
        .catch(err =>{
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled" :
                case "auth-user-not-found" :  
                   setEmailError(err.message);
                   break;
                case "auth/wrong-password" :
                  setPasswordError(err.message)
            }

        });
    };


    const handleSignup = () =>{
        fire
        .auth().createUserWithEmailAndPassword(email,password)
        .catch(err =>{
            switch(err.code){
                case "auth/user-disabled" : 
                   setEmailError(err.message);
                   break;
                case "auth/weak-password" :
                  setPasswordError(err.message)
            }

        });
    };

    const handleLogout = () =>{
        fire.auth().signOut();
    };

    const authListener = () =>{
        fire.auth().onAuthStateChanged(user =>{
            if(user){
                setUser(user);
            }
            else{
                setUser("");
            }
        });
    };

    useEffect(()=>{
        authListener();
    }, []); 

    return (
        <div className="">

        </div>
    )
}