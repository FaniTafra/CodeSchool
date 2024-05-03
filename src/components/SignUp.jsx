import { useState, useEffect } from "react";
import '../App.css'

function SignUp(props) {
    const [username, setUsername] = useState('')
    const [reason, setReason] = useState('')
    const [errorName, setErrorName] = useState(false);
    const [email, setEmail] = useState("");
    let re = /[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9+_.-]+/;
    let na = /^[a-zA-Z]+(\s[a-zA-Z]+)+(\s[a-zA-Z]*)*$/;
    let rs = /^.{5,}$/;
    const [errorEmail, setErrorEmail] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorReason, setErrorReason] = useState(false);

    function isEmptyString(str) {
        return str.trim() === '';
    }

    useEffect(() => {
        if (na.test(username) || isEmptyString(username)) {
            setErrorName(false)
        }
        else {
            setErrorName(true)
        }
    }, [username])
    
    useEffect(() => {
        if (re.test(email) || isEmptyString(email)) {
          setErrorEmail(false)
        }
        else {
            setErrorEmail(true)
        }
    }, [email])

    useEffect(() => {
        if (rs.test(reason) || isEmptyString(reason)) {
          setErrorReason(false)
        }
        else {
            setErrorReason(true)
        }
    }, [reason])

    function handleLogin(e) {
        e.preventDefault()
       if (!errorName && !errorEmail && !isEmptyString(username) && !isEmptyString(email) && !errorReason && !isEmptyString(reason)) {
            props.sign(props.br);
            setSuccess(true);
        }
        else
            setSuccess(false) 
    }

    return (
        <div className="popup">
            <div className="popup-inner">
            {success ? (
                    <>
                        <h2>Hvala na prijavi!</h2>
                        <button onClick={props.toggle}>Zatvori</button>
                    </>
                    ) : (
                    <>
                        <h2>Prijavi se na {props.name}</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                    <input type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ime' />
                                    {errorName ? (
                                    <p className="error">Molimo unesite puno ime i prezime.</p>
                                    ) : null}
                            </div>
                            <div className="form-group">
                                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email adresa' />
                                    {errorEmail ? (
                                    <p className="error">Unesite ispravnu e-mail adresu u obliku primjer@primjer.abc.</p>
                                    ) : null}
                            </div>
                            <div className="form-group">
                                    <input type="text" id="razlog" value={reason} onChange={(e) => setReason(e.target.value)} placeholder='Razlog prijave' />
                                    {errorReason ? (
                                    <p className="error">Mora sadržavati barem pet znakova.</p>
                                    ) : null}
                            </div>
                            <button type="submit">Prijavi se</button>
                            <button onClick={props.toggle}>Zatvori</button>
                        </form>
                    </>
                    )}
            </div>
        </div>
    )
}

export default SignUp