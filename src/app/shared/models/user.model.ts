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

export class UserFull {
  id!: number
  firstname!: string;
  lastname!: string;
  username!: string;
  password!: string;
  profilePhoto!: string;
  createdAt!: string;
}
