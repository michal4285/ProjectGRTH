

import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';
import './login-page.scss';



// function mapStateToProps(state) {
//   return {
//     user: state.users
//   }
// }
// const mapDispatchToProps = (dispatch) => ({
//   setUserName: (value) => dispatch(actionsStore.setUserName(value)),
//   setUserEmail: (value) => dispatch(actionsStore.setUserEmail(value))

// })


function Login() {
  const history = useHistory()

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  // const [email, setEmail] = useState()
  // const [passward, setpassward] = useState()
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  const setMessage = () => {
    alert("one or more details are not correct");
  }
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    console.log('email:', email)
    console.log("pasward");
  debugger;

      fetch(`http://localhost:3003/api/getUserByMail/${email}`, {
        method: 'GET',
      }).then(response => response.json()).then(data => {
        debugger;
        console.log('data:', data)
        if (data) { // console.log(passward)
          if (!data.user) {
            setMessage()
          }
          else {
            document.cookie = "jwt" + "=" + data.token + ';'
            // setUserName(data.user.name)
            // console.log(data.user.mail)
            // setUserEmail(data.user.mail)
            console.log("users.email", user.mail)
            history.push('list')
          }
        }        
      }
      ).catch(error=>{
        console.log(error)
        setSubmitted(true);
        if (email && password) {
          debugger;
          const { from } = location.state || { from: { pathname: "/" } };
          dispatch(userActions.login(email, password, from));
        }
      })

  }

  return (
    <>

      <div className=" inner-container">
        {/* <div className="header" onClick={() => history.push('/SignIn')}> Sign In</div> */}
        <div className="header">
          <p style={{ display: 'inline-block', borderBottom: "2px solid" }}> Log in</p><p style={{ display: 'inline-block', paddingLeft: "20px" }} onClick={() => history.push('/register')}> Sign up</p>
        </div>
        <form name="form" onSubmit={handleSubmit}>
          <div className="box">
            <div className="input-group">
              <label htmlFor="email">email</label>
              <input
                type="text"
                name="email"
                className="login-input"
                value={email}
                onChange={handleChange}
                placeholder="email" />
              {submitted && !email &&
                <div className="invalid-feedback">Username is required</div>
              }
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                value={password}
                onChange={handleChange}
                placeholder="Password" />
              {submitted && !password &&
                <div className="invalid-feedback">Password is required</div>
              }
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={handleSubmit}>Login</button>
          </div>
        </form>
      </div>
    </>
  )
}
export { Login };
