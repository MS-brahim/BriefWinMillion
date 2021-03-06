import {combineReducers} from 'redux';

import auth from './auth_reducer';
import participants from './admin_reducer';
import groupsMember from './account_reducer';

export default combineReducers({
    auth,
    participants,
    groupsMember
})