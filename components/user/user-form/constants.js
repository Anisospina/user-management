import { TextField } from "./controls/text-field";

export const PANELS = {
  PROFILE_INFO: "profile_info",
  ADDRESS: "address",
  COMPANY: "company",
};

export const PANELS_CONFIG = [
  {
    id: PANELS.PROFILE_INFO,
    title: "Profile Info",
  },
  {
    id: PANELS.ADDRESS,
    title: "Address",
  },
  {
    id: PANELS.COMPANY,
    title: "Company",
  },
];

export const FORM_CONFIG = {
  [PANELS.PROFILE_INFO]: [
    {
      id: "name",
      label: "Name",
      placeholder: "e.g: John Doe",
      type: "text",
      component: TextField,
      layout: { sm: 6 },
    },
    {
      id: "username",
      label: "Username",
      placeholder: "e.g: agent_john_doe",
      type: "text",
      component: TextField,
      layout: { sm: 6 },
    },
    {
      id: "phone",
      label: "Phone",
      placeholder: "e.g: 312 345 6789",
      type: "text",
      component: TextField,
      layout: { sm: 6 },
      offset: { xs: 6 },
    },
    {
      id: "website",
      label: "Website",
      placeholder: "e.g: www.john-doe.com",
      type: "text",
      component: TextField,
    },
  ],
  [PANELS.ADDRESS]: [
    {
      id: "address.street",
      label: "Street",
      placeholder: "e.g: 742 Evergreen Terrace",
      type: "text",
      component: TextField,
      layout: { xs: 12, md: 4 },
    },
    {
      id: "address.city",
      label: "City",
      placeholder: "e.g: Springfield",
      type: "text",
      component: TextField,
      layout: { xs: 12, md: 4 },
    },
    {
      id: "address.zipcode",
      label: "ZIP Code",
      placeholder: "e.g: 12345",
      type: "text",
      component: TextField,
      layout: { xs: 12, md: 4 },
    },
  ],
  [PANELS.COMPANY]: [
    {
      id: "company.name",
      label: "Name",
      placeholder: "e.g: My Company",
      type: "text",
      component: TextField,
      layout: { sm: 6 },
    },
    {
      id: "company.catchPhrase",
      label: "Bio",
      placeholder: "e.g: Tell who you are",
      type: "text",
      component: TextField,
      layout: { sm: 6 },
    },
  ],
};
