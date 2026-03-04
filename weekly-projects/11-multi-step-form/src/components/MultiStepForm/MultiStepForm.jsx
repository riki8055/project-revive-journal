import { useReducer } from "react";
import { formReducer, initialState } from "./formReducer";
import StepPersonal from "./StepPersonal";
import StepEducation from "./StepEducation";
import StepExperience from "./StepExperience";
import StepReview from "./StepReview";
import { validatePersonal } from "./validatePersonal";
import { checkEmailExists } from "./fakeAPI";

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { currentStep, formData, errors } = state;

  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <StepPersonal
            data={formData.personal}
            dispatch={dispatch}
            errors={errors}
          />
        );
      case 2:
        return <StepEducation data={formData.education} dispatch={dispatch} />;
      case 3:
        return (
          <StepExperience data={formData.experience} dispatch={dispatch} />
        );
      case 4:
        return <StepReview data={formData} dispatch={dispatch} />;
      default:
        return null;
    }
  }

  async function handleNext() {
    if (state.currentStep === 1) {
      // run the synchronous validations first
      const errors = validatePersonal(formData.personal);

      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", errors });
        return;
      }

      // perform the async email existence check
      try {
        const exists = await checkEmailExists(formData.personal.email);
        if (exists) {
          dispatch({
            type: "SET_ERRORS",
            errors: { email: "Email already exists" },
          });
          return; // don't advance
        }
        // if not exists, clear any previous email error
        dispatch({ type: "SET_ERRORS", errors: { email: "" } });
      } catch (err) {
        // optional: handle API failure; for now we'll just log
        console.error("email check failed", err);
      }
    }

    dispatch({ type: "NEXT_STEP" });
  }

  return (
    <>
      {renderStep()}

      <div>
        {currentStep > 1 && (
          <button onClick={() => dispatch({ type: "PREV_STEP" })}>Back</button>
        )}

        {currentStep < 4 && <button onClick={handleNext}>Next</button>}
      </div>
    </>
  );
}
