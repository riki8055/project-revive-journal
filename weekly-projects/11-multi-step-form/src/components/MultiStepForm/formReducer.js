export const initialState = {
  currentStep: 1,
  formData: {
    personal: {
      firstName: "",
      lastName: "",
      email: "",
    },
    education: {
      degree: "",
      university: "",
      year: "",
    },
    experience: {
      company: "",
      role: "",
      years: "",
    },
  },
};

export function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.section]: {
            ...state.formData[action.section],
            [action.field]: action.value,
          },
        },
      };

    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };

    case "PREV_STEP":
      return { ...state, currentStep: state.currentStep - 1 };

    case "GO_TO_STEP":
      return { ...state, currentStep: action.step };

    default:
      return state;
  }
}
