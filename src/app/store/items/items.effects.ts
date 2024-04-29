import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MasterService } from '../../_service/master.service'
import {
  addItem,
  addItemSuccess,
  deleteItem,
  deleteItemSuccess,
  emptyAction,
  loadItem,
  loadItemFail,
  loadItemSuccess,
  showAlert,
  updateItem,
  updateItemSuccess,
} from './items.actions'
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class ItemEffects {
  constructor(
    private action$: Actions,
    private service: MasterService,
    private _snackbar: MatSnackBar,
  ) {}

  _loadItem = createEffect(() =>
    this.action$.pipe(
      ofType(loadItem),
      exhaustMap(action => {
        return this.service.Getallitems().pipe(
          map(data => {
            return loadItemSuccess({ list: data })
          }),
          catchError(_err => of(loadItemFail({ errormessage: _err.message }))),
        )
      }),
    ),
  )

  _addItem = createEffect(() =>
    this.action$.pipe(
      ofType(addItem),
      switchMap(action => {
        return this.service.CreateItem(action.item).pipe(
          switchMap(() => {
            return of(
              addItemSuccess(),
              showAlert({ message: 'Added successfully', resptype: 'pass' }),
            )
          }),
          catchError(_err =>
            of(showAlert({ message: 'Failed to add', resptype: 'fail' })),
          ),
        )
      }),
    ),
  )

  _updateItem = createEffect(() =>
    this.action$.pipe(
      ofType(updateItem),
      switchMap(action => {
        return this.service.UpdateItem(action.inputdata).pipe(
          switchMap(() => {
            return of(
              updateItemSuccess(),
              showAlert({ message: 'Updated successfully', resptype: 'pass' }),
            )
          }),
          catchError(_err =>
            of(showAlert({ message: 'Failed to update', resptype: 'fail' })),
          ),
        )
      }),
    ),
  )

  _deleteItem = createEffect(() =>
    this.action$.pipe(
      ofType(deleteItem),
      switchMap(action => {
        return this.service.DeleteItem(action.id).pipe(
          switchMap(() => {
            return of(
              deleteItemSuccess({ id: action.id }),
              showAlert({ message: 'Removed successfully', resptype: 'pass' }),
            )
          }),
          catchError(_err =>
            of(showAlert({ message: 'Failed to delete', resptype: 'fail' })),
          ),
        )
      }),
    ),
  )

  _showalert = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap(action => {
        return this.Showsnackbaraler(action.message, action.resptype)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction()
            }),
          )
      }),
    ),
  )

  Showsnackbaraler(message: string, resptype: string = 'fail') {
    let _class = resptype === 'pass' ? 'text-green' : 'text-red'
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class],
    })
  }
}
