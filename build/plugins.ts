import { viteBuildInfo } from "./info";
import legacy from "@vitejs/plugin-legacy";
// import styleImport from 'vite-plugin-style-import';
import svgr from 'vite-plugin-svgr'
import { viteMockServe } from "vite-plugin-mock";
import reactRefresh from '@vitejs/plugin-react-refresh'

import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";

export function getPluginsList(command: string, VITE_LEGACY: boolean) {
  const prodMock = true;
  const lifecycle = process.env.npm_lifecycle_event;
  return [
    reactRefresh(),
    // 线上环境删除console
    removeConsole(),
    viteBuildInfo(),
    svgr(),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: 'antd',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `antd/es/${name}/style/index`;
    //       },
    //     },
    //   ],
    // }),
    // mock支持
    viteMockServe({
      mockPath: "mock",
      supportTs: true,
      watchFiles: true,
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    }),
    // 是否为打包后的文件提供传统浏览器兼容性支持
    VITE_LEGACY
      ? legacy({
          targets: ["ie >= 11"],
          additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
        })
      : null,
    // 打包分析
    lifecycle === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : null
  ];
}
