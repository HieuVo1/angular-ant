import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { UserService } from "src/app/modules/authorization/services/user.service";

export function usernameExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.checkExists(control.value).pipe(
      map(user => user.data ? { usernameExists: true } : null)
    )
  }
}
