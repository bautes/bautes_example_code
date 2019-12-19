
import React from 'react';
import { useTranslation } from 'react-i18next';

const Thankyou = props => {
  const { t } = useTranslation()
  return <div className="Thankyou">{t('Thank you!')}</div>
}

export default Thankyou