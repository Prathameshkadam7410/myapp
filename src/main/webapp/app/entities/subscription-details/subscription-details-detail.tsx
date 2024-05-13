import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './subscription-details.reducer';

export const SubscriptionDetailsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const subscriptionDetailsEntity = useAppSelector(state => state.subscriptionDetails.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subscriptionDetailsDetailsHeading">
          <Translate contentKey="myApp.subscriptionDetails.detail.title">SubscriptionDetails</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.id}</dd>
          <dt>
            <span id="subscriptionName">
              <Translate contentKey="myApp.subscriptionDetails.subscriptionName">Subscription Name</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.subscriptionName}</dd>
          <dt>
            <span id="subscriptionStartDate">
              <Translate contentKey="myApp.subscriptionDetails.subscriptionStartDate">Subscription Start Date</Translate>
            </span>
          </dt>
          <dd>
            {subscriptionDetailsEntity.subscriptionStartDate ? (
              <TextFormat value={subscriptionDetailsEntity.subscriptionStartDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="subscriptionExpiryDate">
              <Translate contentKey="myApp.subscriptionDetails.subscriptionExpiryDate">Subscription Expiry Date</Translate>
            </span>
          </dt>
          <dd>
            {subscriptionDetailsEntity.subscriptionExpiryDate ? (
              <TextFormat value={subscriptionDetailsEntity.subscriptionExpiryDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="additionalComments">
              <Translate contentKey="myApp.subscriptionDetails.additionalComments">Additional Comments</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.additionalComments}</dd>
          <dt>
            <span id="notificationBeforeExpiry">
              <Translate contentKey="myApp.subscriptionDetails.notificationBeforeExpiry">Notification Before Expiry</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.notificationBeforeExpiry}</dd>
          <dt>
            <span id="notificationMuteFlag">
              <Translate contentKey="myApp.subscriptionDetails.notificationMuteFlag">Notification Mute Flag</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.notificationMuteFlag ? 'true' : 'false'}</dd>
          <dt>
            <span id="notificationTo">
              <Translate contentKey="myApp.subscriptionDetails.notificationTo">Notification To</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.notificationTo}</dd>
          <dt>
            <span id="notificationCc">
              <Translate contentKey="myApp.subscriptionDetails.notificationCc">Notification Cc</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.notificationCc}</dd>
          <dt>
            <span id="notificationBcc">
              <Translate contentKey="myApp.subscriptionDetails.notificationBcc">Notification Bcc</Translate>
            </span>
          </dt>
          <dd>{subscriptionDetailsEntity.notificationBcc}</dd>
        </dl>
        <Button tag={Link} to="/subscription-details" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/subscription-details/${subscriptionDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SubscriptionDetailsDetail;
