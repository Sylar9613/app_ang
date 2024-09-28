import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animation',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-animation.component.html',
  styleUrl: './dialog-animation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAnimationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dialogTitle: string, dialogContent: string, dialogCancel: boolean}) { }

    onConfirm(): void {
      this.dialogRef.close(true);
    }
  
    onCancel(): void {
      this.dialogRef.close(false);
    }
}
