import {Apis} from "tuscjs-ws";
import {ChainStore} from "../lib";

Apis.instance("ws://18.220.127.200:8090", true).init_promise.then(res => {
    console.log("connected to:", res[0].network);
    ChainStore.init(false).then(() => {
        ChainStore.subscribe(updateState);
    });
});

let dynamicGlobal = null;
function updateState(object) {
    dynamicGlobal = ChainStore.getObject("2.1.0");

    console.log("ChainStore object update");
    console.log(dynamicGlobal);

    console.log(ChainStore.getAccount("tuscmpone", false));
}
