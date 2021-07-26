import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Account from './account/account';
import Institute from './account/institute';
import ClassInfo from './course/classInfo';
import CourseOverview from './course/courseOverview';
import AccessLog from './system/accessLog';
import SubmitLang from './system/submitLang';
import NoMatch from '../../components/noMatch';
import Announcement from '../../components/admin/system/Announcement';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role.indexOf('MANAGER') === -1) {
        this.props.history.push('/notFound');
      }
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/admin/course/overview" component={CourseOverview} />
        <Route path="/admin/course/:class" component={ClassInfo} />
        <Route path="/admin/account/institute" component={Institute} />
        <Route path="/admin/account/account" component={Account} />
        <Route path="/admin/system/accesslog" component={AccessLog} />
        <Route path="/admin/system/announcement" component={Announcement} />
        <Route path="/admin/system/submitlang" component={SubmitLang} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Admin));
