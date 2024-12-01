const path = require("path");
const WebpackObfuscator = require("webpack-obfuscator");

//экспортируем объект конфигурации
module.exports = {
  //доп. плагины, которые можно применять к процессу сборки
  plugins: [
    new WebpackObfuscator({
      rotateStringArray: true,
    }),
  ],
  //production - оптимизация производительности и минимизация размера кода
  //development - скорость сборки и удобство отладки
  mode: "production",
  //точка входа в приложение, с которого начнётся процесс сборки
  entry: "./main.ts",
  // выходной файл и путь для сохранения
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  //поддреживаемые расширения при импортах
  resolve: {
    extensions: [".ts", ".js"],
  },
  //настройка загрузчика
  module: {
    rules: [
      {
        //файлы .ts
        test: /\.ts$/,
        //обрабатываются с помощью загрузчика ts-loader
        use: "ts-loader",
        //не обрабатываем файлы из
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8080,
    hot: true,
  },
};