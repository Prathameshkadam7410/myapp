import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubscriptionDetails } from 'app/shared/model/subscription-details.model';
import { getEntity, updateEntity, createEntity, reset } from './subscription-details.reducer';

export const SubscriptionDetailsUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const subscriptionDetailsEntity = useAppSelector(state => state.subscriptionDetails.entity);
  const loading = useAppSelector(state => state.subscriptionDetails.loading);
  const updating = useAppSelector(state => state.subscriptionDetails.updating);
  const updateSuccess = useAppSelector(state => state.subscriptionDetails.updateSuccess);

  const handleClose = () => {
    navigate('/subscription-details');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.subscriptionStartDate = convertDateTimeToServer(values.subscriptionStartDate);
    values.subscriptionExpiryDate = convertDateTimeToServer(values.subscriptionExpiryDate);
    if (values.notificationBeforeExpiry !== undefined && typeof values.notificationBeforeExpiry !== 'number') {
      values.notificationBeforeExpiry = Number(values.notificationBeforeExpiry);
    }

    const entity = {
      ...subscriptionDetailsEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          subscriptionStartDate: displayDefaultDateTime(),
          subscriptionExpiryDate: displayDefaultDateTime(),
        }
      : {
          ...subscriptionDetailsEntity,
          subscriptionStartDate: convertDateTimeFromServer(subscriptionDetailsEntity.subscriptionStartDate),
          subscriptionExpiryDate: convertDateTimeFromServer(subscriptionDetailsEntity.subscriptionExpiryDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="myApp.subscriptionDetails.home.createOrEditLabel" data-cy="SubscriptionDetailsCreateUpdateHeading">
            <Translate contentKey="myApp.subscriptionDetails.home.createOrEditLabel">Create or edit a SubscriptionDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="subscription-details-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('myApp.subscriptionDetails.subscriptionName')}
                id="subscription-details-subscriptionName"
                name="subscriptionName"
                data-cy="subscriptionName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.subscriptionStartDate')}
                id="subscription-details-subscriptionStartDate"
                name="subscriptionStartDate"
                data-cy="subscriptionStartDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.subscriptionExpiryDate')}
                id="subscription-details-subscriptionExpiryDate"
                name="subscriptionExpiryDate"
                data-cy="subscriptionExpiryDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.additionalComments')}
                id="subscription-details-additionalComments"
                name="additionalComments"
                data-cy="additionalComments"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.notificationBeforeExpiry')}
                id="subscription-details-notificationBeforeExpiry"
                name="notificationBeforeExpiry"
                data-cy="notificationBeforeExpiry"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.notificationMuteFlag')}
                id="subscription-details-notificationMuteFlag"
                name="notificationMuteFlag"
                data-cy="notificationMuteFlag"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.notificationTo')}
                id="subscription-details-notificationTo"
                name="notificationTo"
                data-cy="notificationTo"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.notificationCc')}
                id="subscription-details-notificationCc"
                name="notificationCc"
                data-cy="notificationCc"
                type="text"
              />
              <ValidatedField
                label={translate('myApp.subscriptionDetails.notificationBcc')}
                id="subscription-details-notificationBcc"
                name="notificationBcc"
                data-cy="notificationBcc"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/subscription-details" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SubscriptionDetailsUpdate;
