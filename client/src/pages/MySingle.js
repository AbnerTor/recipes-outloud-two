
  // NOTE TO TEAM: EDIT_RECIPE FUNCTION IS DEFINED IN MYSINGLE.JS - "Read Recipe Aloud" WILL BE AVAILABLE TOO.

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
// import { REMOVE_RECIPE } from '../utils/mutations';

import Auth from '../utils/auth';