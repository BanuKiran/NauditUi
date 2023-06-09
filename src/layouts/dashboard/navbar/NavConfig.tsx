// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

export const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
  },
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'Employee',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Employeelist', path: PATH_DASHBOARD.user.employee },

          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
    ],
  },
  // HealthCare
  // .........................................................
  // {
  //   subheader: 'Health Care',
  //   items: [
  //     // Pharmacy
  //     {
  //       title: 'Pharmacy',
  //       path: 'PATH_DASHBOARD',
  //       children: [
  //         { title : 'Medicines', path: 'PATH_DASHBOARD'},
  //       ],
  //     },
  //   ],
  // },

  // NIST
  // ----------------------------------------------------------------------
  {
    subheader: 'Audit',
    items: [
      // USER
      {
        title: 'nist',
        path: PATH_DASHBOARD.nist.root,
        icon: ICONS.user,
        children: [
          { title: 'systems', path: PATH_DASHBOARD.nist.systems },
          { title: 'softwares', path: PATH_DASHBOARD.nist.softwares },
          { title: 'controls', path: PATH_DASHBOARD.nist.controls },
          { title: 'features', path: PATH_DASHBOARD.nist.features },
        ],
      },
    ],
  },

  // TIMEOFF
  // ----------------------------------------------------------------------
  {
    subheader: 'Timeoff',
    items: [
      // HOLIDAYS
      {
        title: 'timeoff',
        path: PATH_DASHBOARD.timeoff.root,
        icon: ICONS.user,
        children: [
          { title: 'holidays', path: PATH_DASHBOARD.timeoff.holidays },
          { title: 'timeoff', path: PATH_DASHBOARD.timeoff.timeoff },
        ],
      },
    ],
  },

  // Linkedin
  // ----------------------------------------------------------------------
  {
    subheader: 'Linkedin',
    items: [
      // linkedin
      {
        title: 'Linkedin',
        path: PATH_DASHBOARD.linkedin.root,
        icon: ICONS.user,
        children: [
          { title: 'Lead', path: PATH_DASHBOARD.linkedin.linkedinlead },
          { title: 'Account', path: PATH_DASHBOARD.linkedin.linkedinaccount },
          { title: 'CRM', path: PATH_DASHBOARD.linkedin.crm },
        ],
      },
    ],
  },
  // NIST
  // ----------------------------------------------------------------------
  {
    subheader: 'HR',
    items: [
      // status
      {
        title: 'status',
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.user,
        children: [{ title: 'status', path: PATH_DASHBOARD.hr.status }],
      },
      // status
      {
        title: 'management',
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.user,
        children: [
          { title: 'projects', path: PATH_DASHBOARD.hr.project },
          { title: 'department', path: PATH_DASHBOARD.hr.department },
          { title: 'tasks', path: PATH_DASHBOARD.hr.task },
          { title: 'subtasks', path: PATH_DASHBOARD.hr.subtask },
          { title: 'timesheet attendance', path: PATH_DASHBOARD.hr.timesheetattendance },
        ],
      },
    ],
  },
];
export const navConfigUser = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
  },
];
