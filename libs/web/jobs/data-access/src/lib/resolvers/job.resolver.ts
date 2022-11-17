import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { JobModel } from '@elektra-nx/shared/models';
import { catchError, map, Observable, of } from 'rxjs';
import { JobService } from '../services';

@Injectable()
export class JobResolver implements Resolve<JobModel | undefined> {
  constructor(private job: JobService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobModel | undefined> {
    const id: number = parseInt(route.params['id']);

    if (isNaN(id)) return of(undefined);

    return this.job.getJob(id).pipe(
      map(({ data }) => data.job),
      catchError((error) => of(undefined)),
    );
  }
}
