import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './email-config.reducer';

export const EmailConfigDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const emailConfigEntity = useAppSelector(state => state.emailConfig.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="emailConfigDetailsHeading">
          <Translate contentKey="myApp.emailConfig.detail.title">EmailConfig</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{emailConfigEntity.id}</dd>
          <dt>
            <span id="emailId">
              <Translate contentKey="myApp.emailConfig.emailId">Email Id</Translate>
            </span>
          </dt>
          <dd>{emailConfigEntity.emailId}</dd>
          <dt>
            <span id="tokenString">
              <Translate contentKey="myApp.emailConfig.tokenString">Token String</Translate>
            </span>
          </dt>
          <dd>{emailConfigEntity.tokenString}</dd>
        </dl>
        <Button tag={Link} to="/email-config" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/email-config/${emailConfigEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EmailConfigDetail;
