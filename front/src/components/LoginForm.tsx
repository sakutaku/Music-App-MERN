import React, { useState } from 'react';
import { LoginMutation} from '../type';
import { useAppDispatch } from '../app/hook';
import { useSelector } from 'react-redux';
import { selectLoginError } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../store/usersThunk';

const LoginForm = () => {
  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const error = useSelector(selectLoginError);
  const navigate = useNavigate();
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(fetchLogin(state)).unwrap();
      setState(() => ({
        username: '',
        password: ''
      }));
      navigate('/artists');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <h2 className="form-title">Login</h2>
      <div className="input-wrap">
        <label htmlFor="username" className="form-label">Username</label>
        {/*{*/}
        {/*  Boolean(getFieldError()) &&*/}
        {/*  <span className="error">{getFieldError()}</span>*/}
        {/*}*/}
        <input
          type="text"
          className={error ? 'form-control-error' : 'form-control'}
          name="username"
          id="username"
          value={state.username}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="input-wrap">
        <label htmlFor="password" className="form-label">Password</label>
        {/*{*/}
        {/*  Boolean(getFieldError()) &&*/}
        {/*  <span className="error">{getFieldError()}</span>*/}
        {/*}*/}
        <input
          type="text"
          className={error ? 'form-control-error' : 'form-control'}
          name="password"
          id="password"
          value={state.password}
          onChange={inputChangeHandler}
        />
      </div>
      <button type="submit" className="form-btn">Log in</button>
    </form>
  );
};

export default LoginForm;