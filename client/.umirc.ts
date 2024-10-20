import { defineConfig } from 'umi';
import routes from './config/routes'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: ['@ant-design/pro-components'],
  },
  outputPath: '../dist/public/sn',
  history: { type: 'hash' },
  mountElementId: 'root',
  sass: {},
  publicPath: '/sn/',
  lessLoader: {},
  routes,
  fastRefresh: {},
  // 分包策略
  chunks: ['vendors.umi', 'antd.umi', 'umi'],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          // minChunks: 2,
          minSize: 30000,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              // test: /^.*node_modules[\\/](?!lodash|moment).*$/,
              test:  /[\\/]node_modules[\\/]/,
              priority: 10,
            },
            antd: {
              test: /[\\/]node_modules[\\/]antd|@ant-design/,
              // test: /node_modules[\\/]_@ant-design/,
              priority: 20,
            },
            default: {
              priority: -20,
              reuseExistingChunk: true // 重用已经被分离出去的chunk
            }
          },
        },
      },
    });
  },
  // chainWebpack(memo, { env, webpack }) {
  //   memo.module
  //     .rule('file-loader')
  //     .test(/\.(mp4|mov|avi)$/i)
  //     .use('file-loader')
  //     .loader(require.resolve('file-loader'))
  //     .options({
  //       name: 'media/[name].[hash:8].[ext]',
  //       // publicPath: '/media/', // 公共路径
  //       esModule: true,
  //     });
  // },
});
