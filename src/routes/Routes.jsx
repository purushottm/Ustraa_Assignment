import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TextComponent from "../components";
import Layout from "../layout";

const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <RouteLayout component={TextComponent}  to="/:id" layout={Layout} />
        </Switch>
      </Router>
    </div>
  );
};

const RouteLayout = (props) => {
    const {layout:Layout,component:Component,...rest} = props;
  return <Route {...rest}
        render={props => (
            <Layout>
                <Component {...props}/>
            </Layout>
        )}
  >

  </Route>;
};

export default Routes;
