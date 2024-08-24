import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(
  signupForm: AbstractControl,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = signupForm.get("password")?.value;
    const passwordConfirmed = control.value;

    return password !== passwordConfirmed ? { passwordDismatch: true } : null;
  };
}
