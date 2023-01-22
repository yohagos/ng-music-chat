export class UserBase {
  firstname!: string;
  lastname!: string;
  username!: string;
  password!: string;
}

export class UserExtended {
  user!: UserBase;
  profilePhoto!: string;
  createdAt!: string;
}

