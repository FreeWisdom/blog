import {observable,action, computed} from "mobx"
import {permissionTypes} from "@/utils"
class Permission {
    @observable token:string=""
    @observable role:string=permissionTypes.NONE

    @computed get isLogin(){
        return !!this.token;
    }

    @action login(values){
        this.token="123"
        if(values.userName==="user")
        {
            this.role=permissionTypes.USER
        }else{
            this.role=permissionTypes.MANAGER
        }
    }
}

export default new Permission()