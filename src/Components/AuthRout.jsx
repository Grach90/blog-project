import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const AuthRout = ({component: Component, isAuthenticated, path, type}) => {
    return (
      <Route 
      path={path}
      render={(props) => {
        if(isAuthenticated && type === 'public'){
          return <Redirect to='/' />
        }
        if(!isAuthenticated && type === 'private'){
          return <Redirect to='login' />
        }
        return <Component {...props}/>
      }}
      />
    )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.globalState.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(AuthRout);