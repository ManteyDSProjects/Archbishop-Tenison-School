// Navigation data. Group and link labels are the original site's menu labels,
// verbatim (see the nav list at the top of any crawled page).

const pdf = (label, href) => ({ label, href, newTab: true });
const ext = (label, href) => ({ label, href, newTab: true });

export const ABOUT_US = {
  label: "About Us",
  href: "/about",
  items: [
    { label: "About Us", href: "/about" },
    { label: "Our Ethos and Aims", href: "/ethos-and-aims" },
    { label: "Contact Us", href: "/contact" },
    ext("Our latest Ofsted", "https://reports.ofsted.gov.uk/provider/23/101811"),
    { label: "Development Trust", href: "/development-trust" },
    { label: "Vision312 Launch", href: "/vision312x" },
    { label: "Vision 312", href: "/vision312" },
    { label: "Alumni", href: "/alumni" },
    { label: "Tenacious Together", href: "/tenacioustogether" },
    { label: "Our Governors", href: "/ourgovernors" },
    pdf("SIAMS", "/documents/pages/siams.pdf"),
    { label: "Data Protection", href: "/dataprotection" },
  ],
};

export const INFORMATION = {
  label: "Information",
  href: "/parents",
  items: [
    { label: "Academic Results", href: "/academicresults" },
    { label: "Careers", href: "/careers" },
    pdf("Financial Information", "/documents/pages/financial-information.pdf"),
    ext("Mental Health at Tenison's", "https://sway.office.com/TFRSVIOBA95C19Qn?ref=Link"),
    { label: "Letters Home", href: "/parents/letters" },
    { label: "School Trips 2025", href: "/schooltrips" },
    pdf("SEND Information Report", "/documents/pages/send-information-report.pdf"),
    { label: "Policies", href: "/parents/policies" },
    { label: "Pupil Premium and Policy", href: "/pupil-premium" },
    pdf("Remote Education Statement", "/documents/pages/remote-education-statement.pdf"),
    { label: "School Meals at Tenison's", href: "/schoolmeals" },
    { label: "Term Dates 2026-2027", href: "/parents/term-dates" },
    pdf("The School Day", "/documents/pages/the-school-day.pdf"),
    { label: "Uniform/Equipped to Learn", href: "/schooluniform" },
    { label: "Young Carers", href: "/youngcarers" },
  ],
};

export const CURRICULUM = {
  label: "Curriculum",
  href: "/curriculum",
  items: [
    { label: "Our Curriculum", href: "/curriculum" },
    { label: "Extra Curricular", href: "/extracurricular" },
    { label: "Gifted and Talented", href: "/file-share" },
    { label: "Homework Information", href: "/homeworkinformation" },
    ext("Safeguarding at Tenisons", "https://sway.cloud.microsoft/4E1SvkDsjCwU1uiV?ref=Link"),
    ext("SEN at Tenison's", "https://sway.office.com/CjgyZktMdJWTsctn?ref=Link"),
    { label: "Sixth Form Subject Overviews", href: "/copy-of-sixth-form-subject-overview" },
  ],
};

export const SCHOOL_SERVICES = {
  label: "School Services",
  href: "/school-services",
  items: [
    pdf("Dinner Fob", "/documents/pages/using-the-fob-for-school-dinners.pdf"),
    pdf("How to use MCAS", "/documents/pages/homeworkinformation-4c9a8c.pdf"),
    pdf("Office365", "/documents/pages/office365.pdf"),
    ext(
      "New Free School Meals Application Form",
      "https://forms.cloud.microsoft/pages/responsepage.aspx?id=_53yPdvv2UaM9L2SG-sSKjiiMmxCGgJDnUmAWiqG6QpUMTVZWEpVU0c4NVQ5NEEyNFowVkE2MVhNNi4u&route=shorturl"
    ),
  ],
};

export const STAFF_RECRUITMENT = {
  label: "Staff Recruitment",
  href: "/work-with-us",
  items: [{ label: "Train to Teach", href: "/teacher-training" }],
};

export const ADMISSIONS = {
  label: "Admissions",
  href: "/admissions",
  items: [
    { label: "Welcome Information for Year 7 2026", href: "/welcomeinformation2026" },
    { label: "Applications for Year 7 2027", href: "/applicationsforyear72027" },
    { label: "In Year Applications (Y7-11)", href: "/inyearapplicationsyears7-11" },
    { label: "Sixth Form Admissions", href: "/sixth-form-admissions" },
    { label: "Appeals", href: "/appeals" },
  ],
};

export const CHRISTIAN_DISTINCTIVENESS = {
  label: "Christian Distinctiveness",
  href: "/christian-distinctiveness",
  items: [
    { label: "Chaplaincy", href: "/chaplaincy" },
    { label: "Collective Worship", href: "/collectiveworship" },
    { label: "Christian Distinctiveness", href: "/christian-distinctiveness" },
    { label: "Courageous Advocacy", href: "/courageousadvocacy" },
    { label: "Spirituality", href: "/spirituality" },
    ext("SDBE", "https://education.southwark.anglican.org/"),
    pdf("SIAMS", "/documents/pages/siams.pdf"),
  ],
};

// The original menu groups, used by the footer.
export const MENU_SECTIONS = [
  ABOUT_US,
  INFORMATION,
  CURRICULUM,
  SCHOOL_SERVICES,
  STAFF_RECRUITMENT,
  ADMISSIONS,
  CHRISTIAN_DISTINCTIVENESS,
];

// Desktop / mobile top level. Existing top-level items are kept; the
// dropdowns hold the original menu groups.
export const NAV_LINKS = [
  { label: "About", href: "/about", sections: [{ items: ABOUT_US.items }] },
  { label: "Admissions", href: "/admissions", sections: [{ items: ADMISSIONS.items }] },
  { label: "Curriculum", href: "/curriculum", sections: [{ items: CURRICULUM.items }] },
  {
    label: "Parents",
    href: "/parents",
    sections: [
      { heading: INFORMATION.label, headingHref: INFORMATION.href, items: INFORMATION.items },
      { heading: SCHOOL_SERVICES.label, headingHref: SCHOOL_SERVICES.href, items: SCHOOL_SERVICES.items },
    ],
  },
  {
    label: "Christian Distinctiveness",
    href: "/christian-distinctiveness",
    sections: [{ items: CHRISTIAN_DISTINCTIVENESS.items }],
  },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const UTILITY_LINK = {
  label: "Work with us",
  href: "/work-with-us",
  sections: [
    {
      heading: STAFF_RECRUITMENT.label,
      headingHref: STAFF_RECRUITMENT.href,
      items: STAFF_RECRUITMENT.items,
    },
  ],
};
