import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import { faHospital,faClinicMedical, faUser, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { fab, faGoogle, faYahoo, faLinkedinIn, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';


library.add(
  faHospital,
  faClinicMedical,
  faUser,
  faGoogle,
  faYahoo,
  faLinkedinIn,
  fab,
  faTwitter,
  faInstagram,
  faInfoCircle
  );