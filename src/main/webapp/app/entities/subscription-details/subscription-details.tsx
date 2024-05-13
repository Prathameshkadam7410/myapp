import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './subscription-details.reducer';

export const SubscriptionDetails = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const subscriptionDetailsList = useAppSelector(state => state.subscriptionDetails.entities);
  const loading = useAppSelector(state => state.subscriptionDetails.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="subscription-details-heading" data-cy="SubscriptionDetailsHeading">
        <Translate contentKey="myApp.subscriptionDetails.home.title">Subscription Details</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="myApp.subscriptionDetails.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/subscription-details/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="myApp.subscriptionDetails.home.createLabel">Create new Subscription Details</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {subscriptionDetailsList && subscriptionDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="myApp.subscriptionDetails.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('subscriptionName')}>
                  <Translate contentKey="myApp.subscriptionDetails.subscriptionName">Subscription Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('subscriptionName')} />
                </th>
                <th className="hand" onClick={sort('subscriptionStartDate')}>
                  <Translate contentKey="myApp.subscriptionDetails.subscriptionStartDate">Subscription Start Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('subscriptionStartDate')} />
                </th>
                <th className="hand" onClick={sort('subscriptionExpiryDate')}>
                  <Translate contentKey="myApp.subscriptionDetails.subscriptionExpiryDate">Subscription Expiry Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('subscriptionExpiryDate')} />
                </th>
                <th className="hand" onClick={sort('additionalComments')}>
                  <Translate contentKey="myApp.subscriptionDetails.additionalComments">Additional Comments</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('additionalComments')} />
                </th>
                <th className="hand" onClick={sort('notificationBeforeExpiry')}>
                  <Translate contentKey="myApp.subscriptionDetails.notificationBeforeExpiry">Notification Before Expiry</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('notificationBeforeExpiry')} />
                </th>
                <th className="hand" onClick={sort('notificationMuteFlag')}>
                  <Translate contentKey="myApp.subscriptionDetails.notificationMuteFlag">Notification Mute Flag</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('notificationMuteFlag')} />
                </th>
                <th className="hand" onClick={sort('notificationTo')}>
                  <Translate contentKey="myApp.subscriptionDetails.notificationTo">Notification To</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('notificationTo')} />
                </th>
                <th className="hand" onClick={sort('notificationCc')}>
                  <Translate contentKey="myApp.subscriptionDetails.notificationCc">Notification Cc</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('notificationCc')} />
                </th>
                <th className="hand" onClick={sort('notificationBcc')}>
                  <Translate contentKey="myApp.subscriptionDetails.notificationBcc">Notification Bcc</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('notificationBcc')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subscriptionDetailsList.map((subscriptionDetails, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/subscription-details/${subscriptionDetails.id}`} color="link" size="sm">
                      {subscriptionDetails.id}
                    </Button>
                  </td>
                  <td>{subscriptionDetails.subscriptionName}</td>
                  <td>
                    {subscriptionDetails.subscriptionStartDate ? (
                      <TextFormat type="date" value={subscriptionDetails.subscriptionStartDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {subscriptionDetails.subscriptionExpiryDate ? (
                      <TextFormat type="date" value={subscriptionDetails.subscriptionExpiryDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{subscriptionDetails.additionalComments}</td>
                  <td>{subscriptionDetails.notificationBeforeExpiry}</td>
                  <td>{subscriptionDetails.notificationMuteFlag ? 'true' : 'false'}</td>
                  <td>{subscriptionDetails.notificationTo}</td>
                  <td>{subscriptionDetails.notificationCc}</td>
                  <td>{subscriptionDetails.notificationBcc}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/subscription-details/${subscriptionDetails.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/subscription-details/${subscriptionDetails.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/subscription-details/${subscriptionDetails.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="myApp.subscriptionDetails.home.notFound">No Subscription Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SubscriptionDetails;
