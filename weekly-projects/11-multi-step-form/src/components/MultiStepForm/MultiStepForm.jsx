import { useReducer, useEffect, useRef } from "react";
import { formReducer, initialState } from "./formReducer";
import StepPersonal from "./StepPersonal";
import StepEducation from "./StepEducation";
import StepExperience from "./StepExperience";
import StepReview from "./StepReview";
import { validatePersonal } from "./validatePersonal";
import { checkEmailExists, saveDraftToServer, fakeSubmitAPI } from "./fakeAPI";

export default function MultiStepForm() {
  //  Before Unload Protection
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  function loadDraft() {
    try {
      const savedDraft = localStorage.getItem("FORM_DRAFT");

      if (!savedDraft) return initialState;

      const parsed = JSON.parse(savedDraft);

      return {
        ...initialState,
        ...parsed,
        errors: {}, // never restore errors
      };
    } catch (err) {
      console.error("Failed to load draft", err);
      return initialState;
    }
  }
  // lazily read saved draft for initial state so that we don't hit
  // localStorage on every render
  const [state, dispatch] = useReducer(formReducer, undefined, loadDraft);
  const { currentStep, formData, errors, isSubmitting } = state;

  const saveIdRef = useRef(0);

  async function saveDraft() {
    const saveId = ++saveIdRef.current;

    const draft = {
      currentStep,
      formData,
    };
    // localStorage.setItem("FORM_DRAFT", JSON.stringify(draft));
    await saveDraftToServer(draft);

    if (saveId !== saveIdRef.current) {
      return;
    }

    console.log("Latest save confirmed");
  }

  // autosave whenever relevant parts of the state change, debounced
  const saveTimer = useRef(null);
  useEffect(() => {
    // clear previous timer
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    saveTimer.current = setTimeout(() => {
      saveDraft();
      console.log("Autosaved draft");
    }, 5000); // 5‑second delay

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [currentStep, formData]);

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
    if (currentStep === 1) {
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

  async function handleSubmit() {
    if (isSubmitting) return;

    dispatch({ type: "SUBMIT_START" });

    try {
      await fakeSubmitAPI(formData);
      dispatch({ type: "SUBMIT_SUCCESS" });
      alert("Application submitted successfully!");
    } catch (e) {
      dispatch({ type: "SUBMIT_ERROR" });
      alert("Submission failed. Try again.");
    }
  }

  return (
    <>
      {renderStep()}

      <div>
        {currentStep > 1 && (
          <button onClick={() => dispatch({ type: "PREV_STEP" })}>Back</button>
        )}

        {currentStep < 4 && <button onClick={handleNext}>Next</button>}

        {currentStep === 4 && (
          <button onClick={handleSubmit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        )}
      </div>
    </>
  );
}
