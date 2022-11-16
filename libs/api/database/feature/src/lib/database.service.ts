import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private logger = new Logger(DatabaseService.name);

  constructor(private em: EntityManager) {}

  onModuleInit() {
    const entities = this.em.connection.options.entities;

    if (Array.isArray(entities)) {
      // eslint-disable-next-line
      const names = entities.map((e) => (<Function>e).name).join(', ');

      this.logger.debug(`Loaded ${entities.length} entites: ${names}`);
    }
  }
}
