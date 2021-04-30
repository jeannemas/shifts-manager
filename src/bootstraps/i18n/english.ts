import config from '@/config';

export default {
  MISC: {
    APP_NAME: config.APP_NAME,

    AUTH: {
      SIGN_UP: 'Sign-up',
      SIGN_OUT: 'Sign-out',
      LOG_IN: 'Log-in',
    },

    ACTIONS: {
      EDIT: 'Edit',
      DELETE: 'Delete',
      CANCEL: 'Cancel',
    },

    NONE: 'None',
    NOW: 'Now',
  },

  ENTITIES: {
    USER: {
      NAME: {
        LABEL: 'Name',
        PLACEHOLDER: 'John Doe',
      },
      EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'e.g. john.doe@example.com',
      },
      PASSWORD: {
        LABEL: 'Password',
        PLACEHOLDER: '****************',
      },
    },
    WORKPLACE: {
      NAME: {
        LABEL: 'Name',
        PLACEHOLDER: 'Workplace name',
      },
      ADDRESS: {
        LABEL: 'Address',
        PLACEHOLDER: 'Workplace address',
      },
      DESCRIPTION: {
        LABEL: 'Description',
        PLACEHOLDER: 'Workplace description',
      },
    },
    SHIFT: {
      WORKPLACE: {
        LABEL: 'Workplace',
      },
      START_TIME: {
        LABEL: 'Start time',
        PLACEHOLDER: 'Click to select start time',
        RESET: 'Reset start time',
      },
      END_TIME: {
        LABEL: 'End time',
        PLACEHOLDER: 'Click to select end time',
        RESET: 'Reset end time',
        VALIDATION_MSG: 'End time must come after start time',
      },
      SHIFT_LENGTH: {
        LABEL: 'Shift length',
      },
      TITLE: {
        LABEL: 'Title',
        PLACEHOLDER: 'Shift title',
      },
      DESCRIPTION: {
        LABEL: 'Description',
        PLACEHOLDER: 'Shift description',
      },
    },
  },

  COMPONENTS: {
    NAVBAR: {
      // Authenticated navbar
      AUTHENTICATED: {
        SHIFTS_DROPDOWN: {
          HEADER: 'Shifts',
          ITEMS: {
            MY_SHIFTS: 'My shifts',
            LOG_SHIFT: 'Log shift',
          },
        },

        GREETING_MESSAGE: 'Welcome {name}',
        MANAGE_WORKPLACES: 'My workplaces',
      },

      // Unauthenticated navbar
      UNAUTHENTICATED: {
        //
      },
    },

    NOT_FOUND: {
      TITLE: 'Error 404 page not found',
      SUBTITLE: 'Page {url} not found',
      RETURN: 'Return to the homepage',
    },
  },

  VIEWS: {
    HOME: {
      PAGE_TITLE: 'Home',
    },

    AUTH: {
      SIGN_UP: {
        PAGE_TITLE: 'Sign-up',
        FIELDS: {
          CONFIRM_PASSWORD: {
            LABEL: 'Confirm password',
            PLACEHOLDER: '****************',
          },
        },
      },

      LOG_IN: {
        PAGE_TITLE: 'Log-in',
      },
    },

    MANAGE: {
      WORKPLACES: {
        PAGE_TITLE: 'My workplaces',
        ADD_WORKPLACE_BTN: 'Add workplace',
        NO_WOKPLACES_MSG: 'You do not have any workplaces',
        WORKPLACE_ADDED_SUCCESS_MSG: 'Workplace added successfully',
        WORKPLACE_SAVED_SUCCESS_MSG: 'Workplace saved successfully',
        WORKPLACE_REMOVED_SUCCESS_MSG: 'Workplace removed successfully',
        NEW: {
          TITLE: 'Add workplace',
          SAVE_WORKPLACE_BTN: 'Save workplace',
        },
        EDIT: {
          TITLE: 'Edit workplace',
          SAVE_WORKPLACE_BTN: 'Save workplace',
        },
        DELETE: {
          TITLE: 'Remove workplace',
          MESSAGE_PROMPT: 'Are you sure you want to remove this workplace?',
          MESSAGE_WARNING: 'You will not be able to assign shifts to it anymore.',
          REMOVE_WORKPLACE_BTN: 'Remove workplace',
        },
      },

      ACCOUNT: {
        PAGE_TITLE: 'My account',
        PAGES: {
          PROFILE: {
            HEADER: 'Profile',
            UPDATE_PROFILE_BTN: 'Update profile',
          },
          SECURITY: {
            HEADER: 'Security',
          },
        },
      },
    },

    SHIFTS: {
      HOME: {
        PAGE_TITLE: 'My shifts',
        VIEWS: {
          LIST: 'List',
          CALENDAR: 'Calendar',
        },
        FINISH_SHIFT_BTN: 'Finish now',
        NO_SHIFTS_MSG: 'You do not have any shift',
      },
      NEW: {
        PAGE_TITLE: 'Log shift',
        SHIFT_ADDED_SUCCESS_MSG: 'Shifts added successfully',
      },
      EDIT: {
        PAGE_TITLE: 'Update shift',
        SHIFT_UPDATED_SUCCESS_MSG: 'Shift updated successfully',
      },
      EDITOR: {
        NO_WORKPLACE_SELECTED: '--- None selected ---',
        SAVE_SHIFT_BTN: 'Save shift',
      },
    },
  },

  ERRORS: {
    INVALID_LOGIN_CREDENTIALS: 'Invalid email and/or passwword',
    SHIFT_NOT_FOUND: 'This shift does not exist',
  },
};
