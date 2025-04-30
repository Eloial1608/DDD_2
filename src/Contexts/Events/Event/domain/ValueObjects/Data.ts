export enum ValidPlatforms {
  YOUTUBE = 'YOUTUBE',
  VIMEO = 'VIMEO',
  JITSI = 'JITSI'
}

export class Data {
  constructor (
    readonly url: string,
    readonly platform: ValidPlatforms
  ) {}

  toPrimitives () {
    return {
      url: this.url,
      platform: this.platform
    }
  }
}
