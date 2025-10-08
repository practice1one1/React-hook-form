import { ErrorsForm } from './forms/ErrorsForm';
import { ReadOnlyDisabledForm } from './forms/ReadOnlyDisabledForm';
import { ShouldUnregisterForm } from './forms/ShouldUnregisterForm';
import { ZodValidationForm } from './forms/ZodValidationForm';
import { ZodExptForm } from './forms/ZodExptForm';
import './style/AllForms.css';

const App = () => {
  return (
    <>
      <ZodValidationForm />
      {/* <ZodExptForm /> */}
    </>
  );
};

export default App;
