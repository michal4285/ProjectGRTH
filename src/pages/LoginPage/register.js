import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './login-page.scss';


// function mapStateToProps(state) {
//   return {
//     user: state.user
//   }
// }
// const mapDispatchToProps = (dispatch) => ({
//   setUserName: (value) => dispatch(actionsStore.setUserName(value)),
//   setUserEmail: (value) => dispatch(actionsStore.setUserEmail(value))

// })




function Register(props) {
  const [user, setUser] = useState({
    name: '',
    mail: '',
    password: ''
  });
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false);
  // const { setUserName, setUserEmail, user } = props;
  // const [name, setName] = useState({ name: "" })
  // const [useremail, setUseremail] = useState({ useremail: "email" })
  // const [userPassward, setUserPassward] = useState({ userPassward: "" })
  const [MessagEmail, setMessagEmail] = useState()
  const [MessagName, setMessagName] = useState()
  const [Messagpassward, setMessagpassward] = useState()
  const registering = useSelector(state => state.registration.registering);
  const dispatch = useDispatch();

  const showmessage = (m) => {
    alert(m)
  }

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  const validate = (e) => {
    let fail = true;
    debugger;
    // check password minimal length
    if (user.password.length < 6) {
      setMessagpassward('password needs to be at list 6 characters');
      fail = false;

    }
    else setMessagpassward('');

    if (user.mail === "email" || user.mail.indexOf("@") <= 0) {
      setMessagEmail("not valid email address");
      fail = false;
    }
    else setMessagEmail('');

    if (user.name.length < 1) {
      setMessagName("name not valid");
      fail = false;
    }
    else setMessagName('');

    if (fail) {
      handleSubmit(e)
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
   
    

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ user });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3003/api/createUser", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.isIn == true) {
          showmessage(" the user is exiest")
        }
        else {
          document.cookie = "jwt" + "=" + result.token + ';'
          showmessage("User created")
          // setUserName(name)
          // setUserEmail(useremail)
          history.push('/login')
        }
      })
      .catch(error => {
        console.log('error', error)
        setSubmitted(true);
        if (user.name && user.mail && user.password) {
          dispatch(userActions.register(user));
          debugger;       
        }
         history.push('/login')
      });
  }

  return (
    <>
      <div className="inner-container">
        <div className="header">
          <p style={{ display: 'inline-block', borderBottom: "2px solid" }}> Sign up</p><p style={{ display: 'inline-block', paddingLeft: "20px" }} onClick={() => history.push('/login')}> Log in</p>
        </div>
        <form name="form" onSubmit={handleSubmit}>
          <div className="box">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="name"
                className="login-input"
                // value={user.name}
                onChange={handleChange}
                placeholder="Username" />
              {submitted && !user.name &&
                <div className="invalid-feedback"> Name is required</div>
              }
            </div>
            <p className="message">{MessagName}</p>

            <div className="input-group">
              <label htmlFor="mail">Email</label>
              <input
                type="text"
                name="mail"
                className="login-input"
                // value={user.mail}
                onChange={handleChange}
                placeholder="Email" />
              {submitted && !user.mail &&
                <div className="invalid-feedback">email is required</div>
              }
            </div>
            <p className="message">{MessagEmail}</p>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                // value={user.password}
                onChange={handleChange}
                placeholder="Password" />
              {submitted && !user.password &&
                <div className="invalid-feedback">Password is required</div>
              }
            </div>
            <p className="message">{Messagpassward}</p>
            <button
              type="button"
              className="login-btn"
              onClick={validate} >Sign In</button>
          </div>
        </form>
      </div>

    </>
  )
}
export { Register };
