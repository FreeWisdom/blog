import React from 'react'

export interface AyncModuleLoaderState {
    asyncComponent: any
}
export default function AyncModuleLoader(importComponent: any) {
    return class AsyncComponent extends React.Component<unknown, AyncModuleLoaderState> {
        constructor(props: unknown) {
            super(props);
            this.state = {
                asyncComponent: null
            };
        }
        async componentDidMount() {
            if (this.state.asyncComponent) {
                return;
            }
            const { default: component } = await importComponent();
            this.setState({
                asyncComponent: component
            });
        }
        render() {
            const {asyncComponent:Component} = this.state
            return Component ? <Component {...this.props} /> : null;
        }
    }
}