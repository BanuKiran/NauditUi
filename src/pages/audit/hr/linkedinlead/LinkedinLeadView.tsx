import { paramCase } from 'change-case';
import { useLocation, useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

// _mock_
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LinkedinLeadState } from '../../../../@types/linkedinlead';
import { getLinkedinLead } from '../../../../redux/slices/linkedinlead';
import { dispatch } from '../../../../redux/store';
import LinkedinLeadDetails from '../../../../sections/hr/linkedinlead/LinkedinLeadDetails';
// ----------------------------------------------------------------------

export default function LinkedinLeadView() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const { linkedinLeads } = useSelector(
    (state: { linkedinlead: LinkedinLeadState }) => state.linkedinlead
  );

  const currentLinkedinLead = linkedinLeads.find(
    (LinkedinLead) => paramCase(LinkedinLead.id) === id
  );

  useEffect(() => {
    dispatch(getLinkedinLead());
  }, []);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Linkedin Lead"
        links={[
          { name: 'Linkedin', href: PATH_DASHBOARD.linkedin.root },
          { name: 'Linkedin Lead', href: PATH_DASHBOARD.linkedin.linkedinlead },
          { name: 'View' },
        ]}
      />
      <LinkedinLeadDetails currentLinkedinLead={currentLinkedinLead} />
    </Container>
  );
}
