import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../../interfaces';

const data_link =
  'https://script.google.com/macros/s/AKfycbxGHAbdl3gFBJY2VpdH8d594yo3UzDBbwaB8KIhoZnehGXPYwU2yf-8GA/exec';

export interface State {
  loading: boolean;
  jobs: Job[];
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {
    // this.fetchJobs();
  }

  private state = new BehaviorSubject<State>({ loading: false, jobs: [] });
  readonly state$ = this.state.asObservable();

  public fetchJobs(): void {
    this.state.next({ ...this.state.value, loading: true });
    this.http.get<Job[]>(data_link).subscribe((data) => {
      this.state.next({ ...this.state.value, loading: false, jobs: data });
    });
  }
}
