export default {
  install: (app: any, options?: any) => {
    app.config.globalProperties.$hello = (algo: string) => {
      if (options?.warning) {
        return alert(algo)
      }
      console.log(algo)
    }
  }
}
