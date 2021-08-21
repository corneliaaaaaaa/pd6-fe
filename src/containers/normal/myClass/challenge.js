import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import ChallengeList from '../../../components/normal/myClass/Challenge/ChallengeList';
import ChallengeInfo from '../../../components/normal/myClass/Challenge/ChallengeInfo';
import Problem from '../../../components/normal/myClass/Challenge/Problem';
import Setting from '../../../components/normal/myClass/Challenge/Setting';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/my-class/:courseId/:classId/challenge" component={ChallengeList} />
          <Route path="/my-class/:courseId/:classId/challenge/:challengeId/setting" component={Setting} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId" component={ChallengeInfo} />
          <Route path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId" component={Problem} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Challenge));
