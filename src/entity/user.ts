import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'sys_user'})
export default class UserEntity {
  @PrimaryGeneratedColumn({ comment: '用户id'})
  id!: number

  @Column({ type: "varchar", length: 32, nullable: true,  comment: '用户名' })
  name!: string

  @Column({ type: "varchar", length: 32, nullable: true,  comment: '账号' })
  account!: string

  @Column({ type: "varchar", length: 16, nullable: true, select: false, comment: '用户密码'})
  password!: string

  @CreateDateColumn({ name: 'create_time', type: "timestamp", comment: '创建时间'})
  createTime!: number

  @UpdateDateColumn({ name: 'update_time', type: "timestamp", comment: '更新时间'})
  updateTime!: number
}
