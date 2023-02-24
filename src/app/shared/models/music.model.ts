export class MusicBase {
  artist!: string;
  title!: string;
  featuring!: string;
  genre!: string;
  path!: string;
  uploaded_by!: string;
  id!: number;
}

export class MusicUpload {
  artist!: string;
  featuring!: string;
  title!: string;
  genre!: string;
}

export interface Music {
  base: MusicBase,
  url: string
}
