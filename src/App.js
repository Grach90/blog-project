import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import Navbar from './Components/Navbar/Navbar';
import {Switch, Redirect} from 'react-router-dom';
import AuthRout from './Components/AuthRout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Add from './Components/Add/Add';
import SingleArticle from './Components/SingleArticle/SingleArticle';
import { ToastContainer, toast } from 'react-toastify';
import Profile from './Components/Profile/profile';
import Spiner from './Components/Spiner/Spiner';

function App(props) {
  const {errorMessage, successMessage, loading} = props;
  useEffect(()=> {
      errorMessage &&  toast.error(errorMessage, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      successMessage && toast.success(successMessage, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
  }, [errorMessage, successMessage]);
  return (
    <div className="App">
     <Navbar />
     <Switch>
      <AuthRout
        component={SingleArticle} 
        path='/article/:id'
        exact={true}
        type='private'
      />
      <AuthRout
        component={Home} 
        path='/'
        exact={true}
        type='private'
      />
      <AuthRout
        component={Login} 
        path='/login'
        exact={true}
        type='public'
      />
      <AuthRout
        component={Add} 
        path='/add'
        exact={true}
        type='private'
      />
      <AuthRout
        component={Register} 
        path='/register'
        exact={true}
        type='public'
      />
      <AuthRout
        component={Profile} 
        path='/profile'
        exact={true}
        type='private'
      />
      <Redirect to='/' />
     </Switch>
     <ToastContainer />
     {loading && <Spiner />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.globalState
  }
}

export default connect(mapStateToProps, null)(App);
