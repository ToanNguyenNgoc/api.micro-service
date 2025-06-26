import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'socket_configs' })
export class SocketConfigEntity extends BaseEntity {
  @Column({ nullable: true })
  ws_host: string;

  @Column({ nullable: true })
  ws_port: string;

  @Column({ nullable: true })
  cluster: string;

  @Column({ nullable: true, default: true })
  enable_stats: boolean;

  @Column({ nullable: true, default: true })
  force_tls: boolean;

  @Column({ nullable: true, default: true })
  status: boolean;
}
