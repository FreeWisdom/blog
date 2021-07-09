import React, { Component } from 'react';
export interface MainProps {
    
}
 
export interface MainState {
    
}
 
class Main extends Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = { };
    }
    render() { 
        return (
            <div>这是主页,登陆了就可以访问</div>
          );
    }
}
 
export default Main;