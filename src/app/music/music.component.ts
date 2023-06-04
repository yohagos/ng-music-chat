import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Music, MusicBase } from '../shared/models/music.model';

import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { FunctionsService } from '../shared/services/functions.service';
import { PlayerService } from '../shared/services/player.service';
import { MenuService } from '../shared/services/menu.service';

interface MenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit, AfterViewInit {
  menu!: MenuItem[]

  musicList: MusicBase[] = [];

  addSongForm!: UntypedFormGroup;

  file!: File

  url: string = ''

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    public fb: UntypedFormBuilder,
    private fr: FunctionsService,
    private player: PlayerService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.addSongForm = this.fb.group({
      artist: [''],
      title: [''],
      genre: [''],
      feature: [''],
    });
  }

  ngAfterViewInit() {
    this.loadMenu();
  }

  loadMenu() {
    setTimeout(() => {
      this.menu = [
        {
          label: 'Profile',
          icon: 'supervised_user_circle',
          action: () => {
            this.router.navigate(['/profile']);
          },
        },
        {
          label: 'Contacts',
          icon: 'contacts',
          action: () => {
            this.router.navigate(['/contact']);
          },
        },
        {
          label: 'Messages',
          icon: 'message',
          action: () => {
            this.router.navigate(['/messages']);
          },
        }
      ];
      this.menuService.setMenu(this.menu);
    });
  }


  musicAll() {
    this.api.getRequestWithToken('music/all').subscribe(
      (data) => {
        this.musicList = data;
      }
    );
  }

  setFile(event: any) {
    this.file = event.target.files[0]
  }

  addSong() {
    let fd: FormData = new FormData();
    fd.append('artist', this.addSongForm.get('artist')?.value)
    fd.append('title', this.addSongForm.get('title')?.value)
    fd.append('genre', this.addSongForm.get('genre')?.value)
    fd.append('featuring', this.addSongForm.get('featuring')?.value)
    fd.append('file', this.file, this.file?.name)

    this.api.postUploadFile('music/add_song',fd).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  playSong(id: number, song: MusicBase) {
    this.api.getRequestWithTokenBlob(`music/song/${id}`).subscribe(
      async (response) => {
        let blob: Blob = response.body as Blob
        let file = new File([blob], song.title, { type: blob.type, lastModified: 0 })
        await this.fr.readFile(file).then(
          value => {
            this.url = value
          }
        )

        this.openMusicPlayer(this.url, song)
      }
    )
  }

  playAllSongs() {
    let playlist: Music[] = [];
    this.musicList.forEach(element => {
      this.api.getRequestWithTokenBlob(`music/song/${element.id}`).subscribe(
        async (response) => {
          let blob = response.body as Blob
          let file = new File([blob], element.title, { type: blob.type })
          await this.fr.readFile(file).then(
            value => {
              playlist.push(
                {
                  base: element,
                  url: value
                }
              )
            }
          )
        }
      )
    });
    setTimeout(() => {}, 1);
    this.player.setMultipleSongs(playlist)
    setTimeout(() => {}, 1);
    this.router.navigate(['/player'])
  }

  openMusicPlayer(url?: string, song?: MusicBase) {
    this.player.setSingleSong(
      {
        base: {
          artist: song?.artist || '',
          featuring: song?.featuring || '',
          genre: song?.genre || '',
          id: song?.id || 0,
          path: song?.path || '',
          title: song?.title || '',
          uploaded_by: song?.uploaded_by || '',
        },
        url:  url?.toString() || ''
      }
    )
    this.router.navigate(['/player'])
  }
}
