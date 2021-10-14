import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { browsePeerReviewSummaryReview } from '../../../../../actions/api/view';

import AutoTable from '../../../../ui/AutoTable';
import PageTitle from '../../../../ui/PageTitle';
import CopyToClipboardButton from '../../../../ui/CopyToClipboardButton';
import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';

const useStyles = makeStyles(() => ({
  copyButton: {
    marginRight: '10px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

/* This is a level 4 component (page component) */
// This page is only for class manager.
export default function PeerReviewSummary() {
  const {
    courseId, classId, challengeId, peerReviewId,
  } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.api.view);
  const error = useSelector((state) => state.error.api.view);
  const PRsummary = useSelector((state) => state.peerReviewSummaryReview);
  const challenges = useSelector((state) => state.challenges.byId);

  const [PRsummaryHTML, setPRsummaryHTML] = useState('');

  useEffect(() => {
    let tableHTML = '<table>';
    tableHTML += '<tr>';
    if (PRsummary.allIds) {
      PRsummary.allIds.map((id) => {
        const profile = `/user-profile/${PRsummary.byId[id].account_id}`;
        const reviewRecord1 = PRsummary.byId[id].peer_review_record_ids
          ? `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${PRsummary.byId[id].account_id}/${PRsummary.byId[id].peer_review_record_ids[0]}`
          : '';
        const reviewRecord2 = PRsummary.byId[id].peer_review_record_ids
          ? `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${PRsummary.byId[id].account_id}/${PRsummary.byId[id].peer_review_record_ids[1]}`
          : '';
        tableHTML += `<td><a href=${profile}>${PRsummary.byId[id].username}</a></td>`;
        tableHTML += `<td>${PRsummary.byId[id].student_id}</td>`;
        tableHTML += `<td>${PRsummary.byId[id].real_name}</td>`;
        if (PRsummary.byId[id].score !== []) {
          tableHTML += `<td><a href=${reviewRecord1}>${PRsummary.byId[id].score[0]}</a></td>`;
          tableHTML += `<td><a href=${reviewRecord2}>${PRsummary.byId[id].score[1]}</a></td>`;
          tableHTML += `<td>${PRsummary.byId[id].average_score}</td>`;
        } else {
          tableHTML += '<td></td>';
          tableHTML += '<td></td>';
          tableHTML += '<td></td>';
        }
        return PRsummary.byId[id];
      });
    }
    tableHTML += '</tr></table>';
    setPRsummaryHTML(tableHTML);
  }, [PRsummary, challengeId, classId, courseId, peerReviewId]);

  if (PRsummary === undefined) {
    if (loading.browsePeerReviewSummaryReview) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${challenges[challengeId].title} / PR / Grader Mode`} />
      <AutoTable
        ident={`${challenges[challengeId].title}-PR-grader`}
        buttons={(
          <div className={classes.copyButton}>
            <CopyToClipboardButton text={PRsummaryHTML} />
          </div>
        )}
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'username',
            label: 'Grader',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'student_id',
            label: 'Student ID',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'real_name',
            label: 'Real Name',
            type: 'TEXT',
            operation: 'LIKE',
          },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(browsePeerReviewSummaryReview(authToken, peerReviewId, browseParams, ident));
        }}
        refetchErrors={[error.browsePeerReviewSummaryReview]}
        columns={[
          {
            name: 'Grader',
            align: 'center',
            minWidth: 139,
            type: 'link',
          },
          {
            name: 'Student ID',
            align: 'center',
            minWidth: 155,
            type: 'string',
          },
          {
            name: 'Real Name',
            align: 'center',
            minWidth: 144,
            type: 'string',
          },
          {
            name: 'Peer 1',
            align: 'center',
            minWidth: 100,
            type: 'link',
          },
          {
            name: 'Peer 2',
            align: 'center',
            minWidth: 100,
            type: 'link',
          },
          {
            name: 'Average Score',
            align: 'center',
            minWidth: 160,
            type: 'string',
          },
        ]}
        reduxData={PRsummary}
        reduxDataToRows={(item) => ({
          id: item.account_id,
          Grader: {
            text: item.username,
            path: `/user-profile/${item.account_id}`,
          },
          'Student ID': item.student_id,
          'Real Name': item.real_name,
          'Peer 1': {
            text: item.score[0] ? item.score[0] : '',
            path: item.peer_review_record_ids
              ? `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${item.account_id}/${item.peer_review_record_ids[0]}`
              : '',
          },
          'Peer 2': {
            text: item.score[1] ? item.score[1] : '',
            path: item.peer_review_record_ids
              ? `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${item.account_id}/${item.peer_review_record_ids[1]}`
              : '',
          },
          'Average Score': item.average_score ? item.average_score : '',
          link: item.peer_review_record_ids.length !== 0
            ? `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${item.account_id}/${item.peer_review_record_ids[0]}`
            : `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/grader-summary`,
        })}
        hasLink
      />
    </>
  );
}
