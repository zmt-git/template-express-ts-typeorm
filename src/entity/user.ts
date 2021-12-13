import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Length, IsEmail } from 'class-validator'

@Entity({ name: 'sys_user'})
export default class UserEntity {
  @PrimaryGeneratedColumn({ comment: '用户id'})
  id!: number

  @Length(2, 16, { message: '用户名长度在2-16'})
  @Column({ type: "varchar", length: 32,  comment: '用户名' })
  name!: string

  @Length(6, 16, { message: '账号长度在6-16'})
  @Column({ type: "varchar", length: 32,  comment: '账号' })
  account!: string

  @IsEmail({ message: '邮箱格式错误'})
  @Column({ type: "varchar", length: 16, nullable: true, comment: '用户email'})
  email!: string

  @Length(6, 16, { message: '用户密码长度在6-16'})
  @Column({ type: "varchar", length: 16, default: '123456', select: false, comment: '用户密码'})
  password!: string

  @CreateDateColumn({ name: 'create_time', type: "timestamp", comment: '创建时间'})
  createTime!: number

  @UpdateDateColumn({ name: 'update_time', type: "timestamp", comment: '更新时间'})
  updateTime!: number
}
