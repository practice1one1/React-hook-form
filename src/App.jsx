import { ErrorsForm } from "./forms/ErrorsForm";
import { ReadOnlyDisabledForm } from "./forms/ReadOnlyDisabledForm";
import { ShouldUnregisterForm } from "./forms/ShouldUnregisterForm";
import { ZodValidationForm } from "./forms/ZodValidationForm";
import "./style/AllForms.css";

const App = () => {
  return (
    <>
      <ZodValidationForm />
    </>
  );
};

export default App;
