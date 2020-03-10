class Footer extends React.Component {
    footerItems = [
        { name: 'github', url: 'https://github.com/imskrao', icon: 'fab fa-github' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/im-skrao/', icon: 'fab fa-linkedin-in', spclClass: 'px-2'},
        { name: 'twitter', url: 'https://twitter.com/im_skrao', icon: 'fab fa-twitter' },
    ]

    renderFooterItems = () => {
        const footerItems = this.footerItems
        return footerItems.map(item => {
            return (<li key={item.name} className={`${item.spclClass ? item.spclClass : ''}`}>
                <a
                    href={item.url}
                    target={'_blank'}
                    className={'rounded-circle'}
                > 
                    <i className={item.icon}></i>
                </a>
            </li>)
        })
    }
    render() {
        return (<div className="raols-footer-grids py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 raosocial-icons text-lg-left text-center">
                            <ul>
                                {this.renderFooterItems()}
                            </ul>
                        </div>
                        <div className="col-lg-6 raol-footer text-lg-right text-center">
                            <p className="copy-right-grids">
                                {'copyright © 2020. All Rights Reserved'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(
    <Footer />,
    document.querySelector('footer')
);