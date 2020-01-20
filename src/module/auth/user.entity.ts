/*
 * Copyright (c) 2019. Philemon GLOBLEHI, Back-end developer
 * Phone: (+225) 79-08-10-50
 * Email: philemongloblehi@gmail.com
 * CreatedAt 15/10/2019 00:06
 */

import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user.role';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('users')
@Unique(['userName', 'email'])
export class UserEntity extends BaseEntity{

  @ApiModelProperty()
  @PrimaryGeneratedColumn({name: 'user_id'})
  id: number;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'user_name', nullable: true})
  userName: String;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'password', nullable: true})
  password: String;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'salt', nullable: true})
  salt: String;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'first_name', nullable: true})
  firstName: String;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'last_name', nullable: true})
  lastName: String;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'email', nullable: true})
  email: String;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'raison_sociale', nullable: true})
  raisonSociale: String;

  @ApiModelProperty({ enum: ['UTILISATEUR', 'ADMIN', 'SUPER_ADMIN']})
  @Column({type: "enum", enum: UserRole, default: UserRole.UTILISATEUR, nullable: true })
  role: UserRole;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'statut', default: true, nullable: true})
  statut: boolean;

  @ApiModelProperty()
  @Column({type: 'varchar', length: 191, name: 'contact', default: true, nullable: true})
  contact: String;

   @ApiModelProperty()
    @CreateDateColumn({name: 'created_at', nullable: true})
    private createdAt: Date;

  public constructor() {
    super();
  }

  public getId(): number {
    return this.id;
  }

  public getUserName(): String {
    return this.userName;
  }

  public setUserName(userName: String): void {
    this.userName = userName;
  }

  public getPassword(): String {
    return this.password;
  }

  public setPassword(password: String): void {
    this.password = password;
  }

  public getSalt(): String {
    return this.salt;
  }

  public setSalt(salt: String): void {
    this.salt = salt;
  }

  public getFirstName(): String {
    return this.firstName;
  }

  public setFirstName(firstName: String): void {
    this.firstName = firstName;
  }

  public getLastName(): String {
    return this.lastName;
  }

  public setLastName(lastName: String): void {
    this.lastName = lastName;
  }

  public getEmail(): String {
    return this.email;
  }

  public setEmail(email: String): void {
    this.email = email;
  }

  public getRaisonSociale(): String {
    return this.raisonSociale;
  }

  public setRaisonSociale(raisonSociale: String): void {
    this.raisonSociale = raisonSociale;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public setRole(role: UserRole): void {
    this.role = role;
  }

  public getStatut() {
    return this.statut;
  }

  public setStatut(statut: boolean) {
    this.statut = statut;
  }

  public getContact() {
    return this.contact;
  }

  public setContact(contact: String) {
    this.contact = contact;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public async validatePassword(password: String): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
