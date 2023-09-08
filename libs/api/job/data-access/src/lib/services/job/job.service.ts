import { JobConfigService } from '@elektra-nx/api/job/config';
import { JobModel } from '@elektra-nx/shared/models';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BehaviorSubject, catchError, EMPTY, filter, lastValueFrom, map, take } from 'rxjs';

@Injectable()
export class JobService {
  constructor(private conf: JobConfigService, private http: HttpService) {
    this.fetchJobs();
  }

  private logger = new Logger(JobService.name);
  private init = new BehaviorSubject<boolean>(false);
  private init$ = this.init.asObservable();

  private jobs: JobModel[] = [];

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async fetchJobs() {
    this.logger.log(`Fetching jobs.`);
    this.http
      .get<JobModel[]>(this.conf.FETCH_URL, { responseType: 'json' })
      .pipe(
        catchError((err) => {
          this.logger.error(`Error fetching jobs.`);
          return EMPTY;
        }),
      )
      .subscribe(({ data }) => {
        this.setJobs(data.filter((e) => e.id != undefined));
        this.init.next(true);
      });
  }

  private setJobs(jobs: JobModel[]): void {
    this.jobs = jobs;
  }

  public getAllJobs(): Promise<JobModel[]> {
    return lastValueFrom(
      this.init$.pipe(
        filter((isInitialized) => isInitialized),
        take(1),
        map(() => {
          return this.jobs;
        }),
      ),
    );
  }

  public getJobById(id: number): Promise<JobModel> {
    return lastValueFrom(
      this.init$.pipe(
        filter((isInitialized) => isInitialized),
        take(1),
        map(() => {
          const found = this.jobs.find((e) => e.id == id);

          if (!found) {
            throw new NotFoundException();
          }

          return found;
        }),
      ),
    );
  }
}
