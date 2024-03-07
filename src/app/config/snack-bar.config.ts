import { SnackBarConfig } from 'src/app/model/snack-bar.interface';

export const snackBarConfig: {
  success: SnackBarConfig;
  error: SnackBarConfig;
} = {
  success: {
    verticalPosition: 'bottom',
    horizontalPosition: 'start',
    panelClass: ['snack-bar-success'],
    duration: 2000,
  },
  error: {
    verticalPosition: 'bottom',
    horizontalPosition: 'start',
    panelClass: ['snack-bar-error'],
    duration: 2000,
  },
};
