export {}
declare global {
    const __APP_INFO__: {
      pkg: {
        name: string;
        version: string;
        dependencies: Recordable<string>;
        devDependencies: Recordable<string>;
      };
      lastBuildTime: string;
    };
    interface Window {
      webkitCancelAnimationFrame: (handle: number) => void;
      mozCancelAnimationFrame: (handle: number) => void;
      oCancelAnimationFrame: (handle: number) => void;
      msCancelAnimationFrame: (handle: number) => void;
      webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
      mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
      oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
      msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    }
  
  
    type Writable<T> = {
      -readonly [P in keyof T]: T[P];
    };
  
    type Recordable<T = any> = Record<string, T>;
    type ReadonlyRecordable<T = any> = {
      readonly [key: string]: T;
    };
    type Indexable<T = any> = {
      [key: string]: T;
    };
    type DeepPartial<T> = {
      [P in keyof T]?: DeepPartial<T[P]>;
    };
    type TimeoutHandle = ReturnType<typeof setTimeout>;
    type IntervalHandle = ReturnType<typeof setInterval>;
  
    interface ChangeEvent extends Event {
      target: HTMLInputElement;
    }
  
    interface WheelEvent {
      path?: EventTarget[];
    }
    interface ImportMetaEnv extends ViteEnv {
      __: unknown;
    }
  
    interface ViteEnv {
      VITE_PORT: number;
      VITE_PUBLIC_PATH: string;
      VITE_PROXY_DOMAIN: string;
      VITE_PROXY_DOMAIN_REAL: string;
      VITE_ROUTER_HISTORY: string;
      VITE_LEGACY: boolean;
      VITE_DROP_CONSOLE:boolean;
      [key: string]: boolean | string | number;
    }
  
    interface ServerConfigs {
      Version?: string;
      Title?: string;
      FixedHeader?: boolean;
      HiddenSideBar?: boolean;
      MultiTagsCache?: boolean;
      KeepAlive?: boolean;
      Locale?: string;
      Layout?: string;
      Theme?: string;
      DarkMode?: boolean;
      Grey?: boolean;
      Weak?: boolean;
      HideTabs?: boolean;
      SidebarStatus?: boolean;
      EpThemeColor?: string;
      ShowLogo?: boolean;
      ShowModel?: string;
      MapConfigure?: {
        amapKey?: string;
        options: {
          resizeEnable?: boolean;
          center?: number[];
          zoom?: number;
        };
      };
    }
    function parseInt(s: string | number, radix?: number): number;
  
    function parseFloat(string: string | number): number;
  
}
  