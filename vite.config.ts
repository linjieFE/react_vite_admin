

import dayjs from "dayjs";
import pkg from "./package.json";
import { warpperEnv, regExps } from "./build";
import { getPluginsList } from "./build/plugins";
import { resolve } from "path";
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";

// 当前执行node命令时文件夹的地址（工作目录）
const root: string = process.cwd();

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

// 设置别名
const alias:Array<{ find: string | RegExp, replacement: string }> = [
  {
    // /@/xxxx  =>  src/xxx
    find: /^~/,
    replacement: pathResolve('node_modules') + '/',
  },
  {
    find: '@',
    replacement: pathResolve('src')
  },
  {
    find: /@\/utils\//,
    replacement: pathResolve('src/utils')
  }
];

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};


// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const {
    VITE_PORT,
    VITE_LEGACY,
    VITE_PUBLIC_PATH,
    VITE_PROXY_DOMAIN,
    VITE_PROXY_DOMAIN_REAL,
    VITE_DROP_CONSOLE
  } = warpperEnv(loadEnv(mode, root));

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理
      proxy:
        VITE_PROXY_DOMAIN_REAL.length > 0
          ? {
              [VITE_PROXY_DOMAIN]: {
                target: VITE_PROXY_DOMAIN_REAL,
                // ws: true,
                changeOrigin: true,
                rewrite: (path: string) => regExps(path, VITE_PROXY_DOMAIN)
              }
            }
          : null
    },
    esbuild: {
      //开启esbuild是否需要清除日志等
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    optimizeDeps: {
      include: ["@ant-design/colors", "@ant-design/icons", "lodash-es"],
      exclude: ["@pureadmin/theme/dist/browser-utils"]
    },

    plugins: getPluginsList(command, VITE_LEGACY),
    build: {
      sourcemap: false,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#1890ff',
          },
        },
      },
    },
  }
}

