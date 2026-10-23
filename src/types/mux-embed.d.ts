declare module "mux-embed" {
  type MuxMetadata = {
    env_key?: string;
    player_name?: string;
    player_init_time?: number;
    video_id?: string;
    video_title?: string;
    video_duration?: number;
    video_stream_type?: string;
    video_content_type?: string;
  };

  interface MuxApi {
    monitor(
      player: HTMLMediaElement,
      options?: {
        hlsjs?: object;
        Hls?: object;
        data?: MuxMetadata;
      },
    ): void;
    destroyMonitor(player: HTMLMediaElement): void;
    utils: { now: () => number };
  }

  const mux: MuxApi;
  export default mux;
}
