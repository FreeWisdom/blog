const Container = require('../component/container.jsx');
const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            columns: reactInitData,
            filtType: reactInitFiltType,
            sortType: reactInitSortType
        }
    }

    render() {
        return (
            <Container
                columns={this.state.columns}
                filt={(filtType) => {
                    // 请求 node/index.js 中的 './data' 接口
                    fetch(`./data?sort=${this.state.sortType}&filt=${filtType}`)
                        .then(res => res.json())
                        .then(json => {
                            // 为了完成无刷新的渲染过滤后的页面，需要在子组件中，将数据转换成 state ，再在父组件中渲染；
                            this.setState({
                                columns: json,
                                filtType: filtType
                            })
                        })
                }}
                sort={(sortType) => {
                    fetch(`./data?sort=${sortType}&filt=${this.state.filtType}`)
                        .then(res => res.json())
                        .then(json => {
                            this.setState({
                                columns: json,
                                sortType: sortType
                            })
                        })
                }}
            />
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('reactapp')
)
