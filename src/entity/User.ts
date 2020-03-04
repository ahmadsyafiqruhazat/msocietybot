import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
import { Role } from './Role';
import { UserPreference } from './UserPreference';
import { Chat } from './Chat';
import { Message } from './Message';
import { Reputation } from './Reputation';
@Entity('user')
export class User {
  @PrimaryColumn('bigint')
  id: number;

  @Column({ nullable: true, unique: true })
  username: string | null;

  @Column({ nullable: true })
  firstName: string | null;

  @Column({ nullable: true })
  lastName: string | null;

  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @OneToMany(
    () => UserPreference,
    preference => preference.user,
  )
  preferences: UserPreference[];

  @OneToMany(
    () => Chat,
    chat => chat.user,
  )
  chats: Chat[];

  @OneToMany(
    () => Message,
    message => message.sender,
  )
  messages: Message[];

  @OneToMany(
    () => Message,
    message => message.originalChat,
  )
  originalMessages: Message[];

  @OneToMany(
    () => Message,
    message => message.userJoined,
  )
  userJoinedMessages: Message[];

  @OneToMany(
    () => Message,
    message => message.userLeft,
  )
  userLeftMessages: Message[];

  @OneToMany(
    () => Reputation,
    reputations => reputations.to_user,
  )
  reputations: Reputation[];

  @OneToMany(
    () => Reputation,
    reputations => reputations.from_user,
  )
  reputationsGiven: Reputation[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date | null;

  @BeforeInsert()
  onBeforeInsertHook(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  onBeforeUpdateHook(): void {
    this.updatedAt = new Date();
  }
}
