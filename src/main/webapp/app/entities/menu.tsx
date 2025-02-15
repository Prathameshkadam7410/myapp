import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/email-config">
        <Translate contentKey="global.menu.entities.emailConfig" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/subscription-details">
        <Translate contentKey="global.menu.entities.subscriptionDetails" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
