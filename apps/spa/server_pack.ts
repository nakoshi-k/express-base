import {createApp} from './application';
import Vue from "vue";

export default context => {
  let server = (resolve,reject) => {
    let feeds = context.feeds;
    const {app, router,store} = createApp(feeds);
    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if(!matchedComponents.length){
        let err = new Error("Not Found (( ；ﾟДﾟ))");
        err["code"] = 404;
        reject(err)
        return;
      }

      Promise.all(matchedComponents.map( (Component:any) => {
        if (Component.asyncData) {
          store.commit("loading");
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
        if(!Component.extendOptions){
          return;
        }
        if(Component.extendOptions.asyncData){
          store.commit("loading/loading");
          return Component.extendOptions.asyncData({
            store,route: router.currentRoute
          });
        }

      })).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(e => {
        console.log("----err------")
        console.log(e)
        resolve(app);
      })

    },reject)
  } 
  return new Promise(server);
}